import { ConnectionPool } from "mssql"
import { DataSource, Repository } from "typeorm"
import { UserEntity } from "./UserEntity"

export class UserContext {
    constructor(pool: ConnectionPool) {
            const dataSource = new DataSource({
                type: "mssql",
                host: "",
                database: "",
                logging: true,
                entities: [],
                extra: {
                    trustServerCertificate: true,
                    Encrypt: true
                },
                port: 0,
                username: "",
                password: ""
            })
            dataSource.initialize().then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
            this.UserEntity = dataSource.getRepository(UserEntity)
        }
    
        UserEntity: Repository<UserEntity>;
}