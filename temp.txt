require('dotenv').config()

import express from 'express'
const app = express();
const port = process.env.PORT || 3000;
import db from './models';

app.use(express.json());
app.use(express.urlencoded({extended: false}))
// create user //done

app.post('/user', async(req, res) => { 
    const {email,name,username,bio} = req.body;
    try {
        const user = await db.User.create({ email,name,username,bio})
            return res.json(user);  
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
        
    }
    
})
//Read user//done

app.get('/user', async(req, res) => { 
    try {
        const user = await db.User.findAll()
            return res.json(user);  
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
        
    }
    
})
// find user by id //done
app.get('/user/:id', async(req, res) =>{
    const id = req.params.id;
    try{
        const data = await db.User.findOne({
            where:{id:id},
            include:'posts'
            
        })
        //console.log(data)
        
        return res.json(data);  
    }catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
    
})
// update user 
app.put('/user/:id', async (req, res) => {
    const id = req.params.id
    const { name, email, username,bio } = req.body
    
    try {
        const user = await db.User.findOne({ where: { id :id} })
        
        
        user.name = name
        user.email = email
        user.username= username
        //user.bio= bio
        await user.save()
        res.status(200).json({message: 'success'})

    }catch (error){
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
// create a post using uuid
})
app.post('/post', async (req, res) => {
    const { userUuid, tweet} = req.body
    try {
        const user = await db.User.findOne({ where: { id: userUuid }})
        const post = await db.Post.create({tweet,userId: user.id})
        
        
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
        const user = await db.User.findOne({where: { id: id },})
        await user.destroy()
        
        return res.json({message: 'User has been deleted!'})
    }catch (error){
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
})
// get all posts

app.get('/posts', async (req, res) => {
    
    try {
       const post = await db.Post.findAll({ include: 'user' })

        return res.json(post)
    }catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
})

db.sequelize.sync().then(() => 
//db.sequelize.authenticate().then(() => 
{
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);

    })
    
})
