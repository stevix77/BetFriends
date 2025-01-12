import { DataSource, Repository } from "typeorm";
import { BetEntity } from "./entities/BetEntity";
import { AnswerEntity } from "./entities/AnswerEntity";
import { FriendshipEntity } from "./entities/FriendshipEntity";
import { MemberEntity } from "./entities/MemberEntity";
import { ConnectionPool } from "mssql";

export class BetContext {
    constructor(pool: ConnectionPool) {
        const dataSource = new DataSource({
            type: "mssql",
            host: "",
            database: "",
            logging: true,
            entities: [BetEntity, 
                        AnswerEntity,
                    FriendshipEntity,
                MemberEntity],
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
        this.BetEntity = dataSource.getRepository(BetEntity)
        this.AnswerEntity = dataSource.getRepository(AnswerEntity)
        this.FriendshipEntity = dataSource.getRepository(FriendshipEntity)
        this.MemberEntity = dataSource.getRepository(MemberEntity)
    }

    BetEntity: Repository<BetEntity>;
    AnswerEntity: Repository<AnswerEntity>;
    FriendshipEntity: Repository<FriendshipEntity>;
    MemberEntity: Repository<MemberEntity>;
}