import { IUserRepository } from "../../domain/users/IUserRepository";
import { User } from "../../domain/users/User";


export class FakeUserRepository implements IUserRepository {
    IsExists(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    Save(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

}