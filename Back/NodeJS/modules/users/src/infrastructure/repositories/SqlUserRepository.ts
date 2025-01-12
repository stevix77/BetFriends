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
        const usersLength = await this.userContext.UserEntity.countBy({
            Email: email,
            Username: username,
            Id: userId
        })
        return usersLength > 0;
    }
    async Save(user: User): Promise<void> {
        const entity = UserEntity.Create(user.GetSnapshot());
        await this.userContext.UserEntity.save(entity);
        this.domainEventAccessor.AddEvents(user.DomainEvents)
    }

}