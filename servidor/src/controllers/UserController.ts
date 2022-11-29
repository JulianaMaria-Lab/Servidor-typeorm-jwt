import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities';
import { generateToken } from "../middlewares";

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { mail, password} = req.body 
    const usuario: any = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.senha')
      .where("user.mail=:mail", { mail })
      .getOne()

    if (usuario && usuario.id) {
      const r = await usuario.compare(password)
      if (r) {
        const token = await generateToken({ id: usuario.id, mail: usuario.mail })
        return res.json({
          id: usuario.id,
          mail: usuario.mail,
          token
        })
      }
      return res.json({ error: "Dados de login não conferem" })
    }
    else {
      return res.json({ error: "Usuário não localizado" })
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    let { name, mail, password, profile, idmaster, departments } = req.body;
    if (!name || name.trim().length == 0) {
      return res.json({ error: "Forneça o nome do empregado" });
    }
    if (!mail || mail.trim().length == 0) {
      return res.json({ error: "Forneça o e-mail do empregado" });
    }
    if (!password || password.trim().length == 0) {
      return res.json({ error: "Forneça a senha do colaborador" });
    }
    const object = new User();
    object.name = name.trim();
    object.mail = mail.trim();
    object.password = password.trim();
    if( profile !== ""){
        object.profile = profile;
    }
// idmaster????//
    const response: any = await AppDataSource.manager.save(User, object).catch((e) => {
      if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Este e-mail já existe no cadastro' }
      }
      return { error: e.message }
    });
    if( !response.error ){
      const {iduser,name,mail,profile,manager,departments} = response;
      return res.json({iduser,name,mail,profile,manager,departments});
    }

    return res.json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { iduser, name, mail, password, profile, idmaster, departments } = req.body
    const usuario: any = await AppDataSource.manager.findOneBy(User, { iduser }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (usuario && usuario.iduser) {
      usuario.mail = mail
      usuario.profile = profile
      if (password!== "") {
        usuario.password = password
      }
      const r = await AppDataSource.manager.save(User, usuario).catch((e) => {
        if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
          return ({ error: 'email já existe' })
        }
        return e
      })
      return res.json(r)
    }
    else if (usuario && usuario.error) {
      return res.json(usuario)
    }
    else {
      return res.json({ error: "Usuário não localizado" })
    }
  }

  // alterar somente a própria senha
  public async updateSenha(req: Request, res: Response): Promise<Response> {
    const { password } = req.body
    const {iduser} = res.locals
    const usuario: any = await AppDataSource.manager.findOneBy(User, { iduser }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (usuario && usuario.iduser) {
      usuario.password = password

      const r = await AppDataSource.manager.save(User, usuario).catch((e) => {
        return ({ error: e.message })
      })
      return res.json(r)
    }
    else if (usuario && usuario.error) {
      return res.json(usuario)
    }
    else {
      return res.json({ error: "Usuário não localizado" })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { iduser } = req.body;
    if( !iduser || iduser.trim() === "" ){
      return res.json({error:"Forneça o identificador do usuário"});
    }
    const object: any = await AppDataSource.manager.findOneBy(User, { iduser });
    if (object && object.iduser) {
      const r = await AppDataSource.manager.remove(User, object).catch((e) => e.message)
      return res.json(r)
    }
    else {
      return res.json({ error: "Usuário não localizado" })
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const object: any = await AppDataSource.getRepository(User).find({
      order: {
        name: 'asc'
      }
    });
    return res.json(object);
  }

}

export default new UserController();