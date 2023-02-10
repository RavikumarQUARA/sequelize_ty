require('dotenv').config()
import db from './models';
import express from 'express'
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use('/api/user', userRoutes);

app.use('api/post', postRoutes);
/*
// Create using controllers
app.use('/api/createUser', require('./routes/createUser'));
//Read user
app.use('/api/readUser', require('./routes/readUser'));


// find user by id //done
//app.use('/api/readOneUser', require('./routes/readOneUser'));


// update user 
app.use('/api/updateUser', require('./routes/updateUser'));

// create a post using uuid
app.use('/api/createPost', require('./routes/createPost'));

// delete post
app.use('/api/deleteUser', require('./routes/deleteUser'));

// get all posts

app.use('/api/readallUser', require('./routes/readallUser'));

*/

db.sequelize.sync().then(() => 
//db.sequelize.authenticate().then(() => 
{
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);

    })
    
})
