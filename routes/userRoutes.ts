import  express from 'express'
import { getUsers, createUser,updateUser ,deleteUser} from '../controllers/userControllers' 

const routes = express.Router()

routes.get('/get', getUsers);
routes.post("/create", createUser);
routes.put("/update", updateUser);
routes.delete("/delete", deleteUser);



export default routes;
