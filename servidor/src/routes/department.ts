import { Router } from "express";
import {department} from "../controllers";
import { authAdmin } from "../middlewares";
const routes = Router();

routes.post('/:departament', authAdmin,department.create);
//routes.put('/:departament', authAdmin,department.update);
//routes.delete('/:departament', authAdmin,department.delete);
//routes.get('/:departament/:user',authorization ,department.get);
//>
//user poder ser true ou false - true retorna dados dos empregados do departamento


//routes.post('/', authAdmin, department.create);
//routes.get('/:employees', department.list);

export default routes;