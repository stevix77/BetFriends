import { IUserRepository } from "../../domain/users/IUserRepository";
import { User } from "../../domain/users/User";


export class FakeUserRepository implements IUserRepository {
    
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
        return Promise.resolve();
    }

}