import { ConnectionPool } from "mssql"
import { DataSource, Repository } from "typeorm"
import { UserEntity } from "./UserEntity"

export class UserContext {
    constructor(dataSource: DataSource) {
            this.UserEntity = dataSource.getRepository(UserEntity)
        }
    
        UserEntity: Repository<UserEntity>;
}