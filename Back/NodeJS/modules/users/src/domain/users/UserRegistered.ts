import { IDomainEvent } from "../../../../shared/domain/IDomainEvent";
import { UserId } from "./UserId";

export class UserRegistered implements IDomainEvent {
    constructor(public readonly UserId: UserId,
                public readonly Username: string,
                public readonly Email: string
    ){}
    Type: string = "UserRegistered";
}