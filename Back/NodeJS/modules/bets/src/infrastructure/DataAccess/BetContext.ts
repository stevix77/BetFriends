import { Repository } from "typeorm";
import { BetEntity } from "./entities/BetEntity";
import { AnswerEntity } from "./entities/AnswerEntity";
import { FriendshipEntity } from "./entities/FriendshipEntity";
import { MemberEntity } from "./entities/MemberEntity";

export class BetContext {
    constructor() {}

    BetEntity: Repository<BetEntity>;
    AnswerEntity: Repository<AnswerEntity>;
    FriendshipEntity: Repository<FriendshipEntity>;
    MemberEntity: Repository<MemberEntity>;
}