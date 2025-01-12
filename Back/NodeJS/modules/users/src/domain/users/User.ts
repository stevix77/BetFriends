import { UserSnapshot } from "./UserSnapshot";
import { Entity } from "../../../../shared/domain/Entity";
import { UserId } from "./UserId";
import { UserRegistered } from "./UserRegistered";

export class User extends Entity {

    static FromSnapshot(snapshot: UserSnapshot): User {
        return new User(new UserId(snapshot.UserId),
                        snapshot.Username,
                        snapshot.Email,
                    snapshot.Password,
                snapshot.RefreshToken)
    }
    static Create(userId: UserId, username: string, email: string, password: string, refreshToken: string): User {
        const user = new User(userId, username, email, password, refreshToken)
        user.AddDomainEvent(new UserRegistered(userId, username, email))
        return user
    }
    
    private constructor(private readonly userId: UserId, 
                private readonly username: string, 
                private readonly email: string, 
                private password: string,
            private refreshToken: string) {
        super();
    }

    public GetSnapshot() : UserSnapshot {
        return new UserSnapshot(this.userId.Value, 
                                this.username, 
                                this.email, 
                                this.password,
                            this.refreshToken)
    }
}