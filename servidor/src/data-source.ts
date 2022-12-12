import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
    database: 'bdaula.db',
    type: "sqlite",
    synchronize: false, // true indica que o schema do BD será criado a cada vez que a aplicação inicializar
    logging: false, // true indica que as consultas e erros serão exibidas no terminal
    entities: ["src/entities/*.ts"], // entidades que serão convertidas em tabelas
    migrations: ["src/migrations/*.ts"], // local onde estarão os arquivos de migração
    subscribers: [],
    maxQueryExecutionTime: 2000 // 2 seg.
});

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    });

export default AppDataSource;