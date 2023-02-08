require('dotenv').config()

import express from 'express'
const app = express();
const port = process.env.PORT || 3000;
import db from './models';

app.use(express.json());
// create user

app.post('/user', async(req, res) => { 
    const {email,name,username} = req.body;
    try {
        const user = await db.User.create({ email,name,username})
            return res.json(user);  
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
        
    }
    
})
//Read user

app.post('/user', async(req, res) => { 
    try {
        const user = await db.User.findAll()
            return res.json(user);  
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
        
    }
    
})
// find user by id
app.get('/user/:id', async(req, res) =>{
    const id = req.params.id;
    try{
        const data = await db.User.findByOne({
            where:{id:id},
            include:'posts'
        })
        return res.json(data);  
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
    
})
// update user
app.put('/user/:id', async (req, res) => {
    const id = req.params.id
    const { name, email, username } = req.body
    
    try {
        const user = await db.User.findOne({ where: { id :id} })
        
        
        user.name = name
        user.email = email
        user.username= username
        await user.save()
        return res.json(user)
    }catch (error){
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
// create a post using uuid
})
app.post('/post', async (req, res) => {
    const { userUuid, tweet, } = req.body
    try {
        const user = await db.User.findOne({ where: { uuid: userUuid }})
        const post = await db.Post.create({tweet, userId: user.id})
        return res.json(post)
    }catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
})
// delete post
app.delete('/user/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({where: { id: id },})
        await user.destroy()
        
        return res.json({message: 'User has been deleted!'})
    }catch (error){
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
})
// get all posts

app.get('/post', async (req, res) => {
    
    try {
       const post = await db.Post.findAll({ include: 'user' })

        return res.json(post)
    }catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
})

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);

    })
    
})
