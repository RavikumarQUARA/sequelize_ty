import  express from 'express'
import { createPost,getPost} from '../controllers/postControllers' 

const routes = express.Router()
routes.post("/create", createPost);
routes.post("/get", getPost);

export default routes;

