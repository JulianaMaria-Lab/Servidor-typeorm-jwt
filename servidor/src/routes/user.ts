import { Router } from "express";
import {user} from "../controllers";
import { authManager, authorization } from "../middlewares";
const routes = Router();

routes.post('/login', user.login)
routes.post('/user', authManager, user.create);
routes.put('/user', authManager,user.update)
routes.put('/user/password', authorization, user.updateSenha)
routes.delete('/user', authManager, user.delete)
routes.get('/', user.list);//
routes.get('/user/:profile/:departament',authorization, user.list)
//>
//profile: employee, manager , admin
//departament: true ou false - se true, retorna os departamentos que trabalha


export default routes;