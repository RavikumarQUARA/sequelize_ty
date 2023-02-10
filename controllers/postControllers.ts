import db from '../models'

    export const createPost = async (req:any, res:any) => {
        const { userUuid, tweet } = req.body;
        try {
          const user = await db.User.findOne({ where: { id: userUuid } });
          const post = await db.Post.create({ tweet, userId: user.id });
    
          return res.json(post);
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
      }
    
      export const getPost = async (req:any, res:any) => {
        try {
            const post = await db.Post.findAll({ include: 'user' })
     
             return res.json(post)
         }catch (error){
             console.log(error)
             return res.status(500).json(error)
         }
     }
     
