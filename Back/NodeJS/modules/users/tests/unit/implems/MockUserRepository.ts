import { IUserRepository } from "../../../src/domain/users/IUserRepository";
import { User } from "../../../src/domain/users/User";

export class MockUserRepository implements IUserRepository {
    constructor(user?: User) {
        this.User = user;
    }
    IsExists(email: string, userId: string, username: string): Promise<boolean> {
        if(this.User) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    Save(user: User): Promise<void> {
        this.User = user;
        return Promise.resolve();
    }
    User?: User;

}