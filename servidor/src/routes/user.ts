import { Router } from "express";
import {user} from "../controllers";
import { authManager, authorization } from "../middlewares";
const routes = Router();

routes.post('/login', user.login) // vii. POST: /login sem restrição de acesso;
routes.post('/user', authManager, user.create); //vii. POST: /user somente usuários com perfil manager; 
routes.put('/user', authManager,user.update) //vii. PUT: /user somente usuários com perfil manager;
routes.put('/user/password', authorization, user.updateSenha) //vii. PUT: /user/password somente usuários logados;
routes.delete('/user', authManager, user.delete) //vii. DELETE: /user somente usuários com perfil manager;
routes.get('/user/:profile/:departament',authorization, user.list)//vii. GET: /user/:profile/:department somente usuários logados;
//>
//profile: employee, manager , admin
//departament: true ou false - se true, retorna os departamentos que trabalha
//routes.get('/', user.list);


export default routes;