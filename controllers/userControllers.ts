import db from '../models'
//interface ResponseType {data:string;msg:string}


// For users
export const getUsers = async (req:any, res:any) => {
    try {
        const post = await db.Post.findAll({ include: 'user' })
 
         return res.json(post)
     }catch (error){
         console.log(error)
         return res.status(500).json(error)
     }

}

export const createUser = async (req:any, res:any) => {
    const {email,name,username} = req.body;
        try {
            const user = await db.User.create({ email,name,username})
                return res.json(user);  
        }catch(error){
            console.log(error)
            return res.status(500).json(error);
            
        }
}
export const updateUser = async (req:any, res:any) => {
    const id = req.params.id
    const { name, email, username, } = req.body
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
}
export const deleteUser = async (req:any, res:any) => {
    const id = req.params.id

    try {
        const user = await db.User.findOne({where: { id: id },})
        await user.destroy()
        
        return res.json({message: 'User has been deleted!'})
    }catch (error){
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
}


