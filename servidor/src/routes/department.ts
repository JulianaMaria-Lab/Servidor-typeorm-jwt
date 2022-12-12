import { Router } from "express";
import {department} from "../controllers";
import { authAdmin, authorization } from "../middlewares";
const routes = Router();

routes.post('/:departament', authAdmin,department.create); //vii. POST: /department somente usuários com perfil admin;
routes.put('/:departament', authAdmin,department.update); //vii. PUT: /department somente usuários com perfil admin;
routes.delete('/:departament', authAdmin,department.delete); //vii. DELETE: /department somente usuários com perfil admin;
routes.get('/:departament/:user', authorization ,department.list); //vii. GET: /department/:user somente usuários logados. 
//>
//user poder ser true ou false - true retorna dados dos empregados do departamento
//routes.get('/:employees', department.list);

export default routes;