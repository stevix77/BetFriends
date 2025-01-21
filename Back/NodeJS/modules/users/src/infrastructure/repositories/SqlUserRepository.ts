import { DomainEventAccessor } from "../../../../shared/infrastructure/events/DomainEventAccessor";
import { IUserRepository } from "../../domain/users/IUserRepository";
import { User } from "../../domain/users/User";
import { UserContext } from "../dataAccess/UserContext";
import { UserEntity } from "../dataAccess/UserEntity";

export class SqlUserRepository implements IUserRepository {
    
    constructor(private readonly userContext: UserContext,
                private readonly domainEventAccessor: DomainEventAccessor
    ) {}
    async IsExists(email: string, userId: string, username: string): Promise<boolean> {
        const users = await this.userContext.UserEntity.find({
            where: [
                { Email: email },
                { Id: userId },
                { Username: username },
            ]
        })
        return users.length > 0;
    }
    async Save(user: User): Promise<void> {
        const entity = UserEntity.Create(user.GetSnapshot());
        await this.userContext.UserEntity.save(entity);
        this.domainEventAccessor.AddEvents(user.DomainEvents)
    }

    async GetEntityById(userId: string): Promise<UserEntity> {
        return await this.userContext.UserEntity.findOneBy({
            Id: userId
        })
    }

}