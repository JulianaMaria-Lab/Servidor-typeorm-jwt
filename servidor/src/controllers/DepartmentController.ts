import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Department } from '../entities';
import { department } from ".";

class DepartmentController {

    public async create(req: Request, res: Response): Promise<Response> {
        let { name } = req.body;
        if (!name || name.trim().length == 0) {
            return res.json({ error: "Forneça o nome do departamento" });
        }
        const object = new Department();
        object.name = name.trim();;
        const department: any = await AppDataSource.manager.save(Department, object).catch((e) => {
            // testa se o name é repetido
            if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
                return { error: 'Já existe um departamento com este nome' };
            }
            return e.message;
        })
        return res.json(department);
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const {employees} = req.params;
        const object: any = await AppDataSource.getRepository(Department).find({
            order: {
                name: 'asc',
            }
        });
        return res.json(object);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        let { iddepartment, name } = req.body
        if (!iddepartment) {
            return res.json({ error: "Identificador inválido" })
        }
        const departament: any = await AppDataSource.manager.findOneBy(Department, { iddepartment}).catch((e) => {
            return { error: e.message }
        })
            
        if (departament && departament.iddepartment) {
            departament.name = name
            const r = await AppDataSource.manager.save(Department, departament).catch((e) => {
                return { error: e.message }
            })
                return res.json(r)
            }
            else if (department && departament.error) {
                return res.json(departament)
            }
            else {
                return res.json({ error: "Departamento não localizado" })
            }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { iddepartment } = req.body
        if (!iddepartment) {
            return res.json({ error: "Identificador inválido" })
        }
        const departament: any = await AppDataSource.manager.findOneBy(Department, { iddepartment}).catch((e) => {
            return { error: e.message }
        })

        if (departament && departament.iddepartment) {
            const r = await AppDataSource.manager.remove(Department, departament).catch((e) => e.message)
            return res.json(r)
        }
        else if (department && departament.error) {
            return res.json(departament)
        }
        else {
            return res.json({ error: "Departamento não localizado" })
        }
    }


}

export default new DepartmentController();