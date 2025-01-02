import { DomainEventAccessor } from "../../../../shared/infrastructure/events/DomainEventAccessor";
import { IUserRepository } from "../../domain/users/IUserRepository";
import { User } from "../../domain/users/User";


export class FakeUserRepository implements IUserRepository {
    
    constructor(private readonly domainEventAccessor: DomainEventAccessor){}
    private readonly users: User[] = [];
    
    IsExists(email: string, userId: string, username: string): Promise<boolean> {
        if(this.users.some(x => {
            const snapshot = x.GetSnapshot();
            return snapshot.UserId == userId ||
                    snapshot.Username == username ||
                    snapshot.Email == email
        })) {
            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    }
    
    Save(user: User): Promise<void> {
        this.users.push(user);
        this.domainEventAccessor.AddEvents(user.DomainEvents);
        return Promise.resolve();
    }

    GetUsers(): User[] {
        return [...this.users]
    }

}