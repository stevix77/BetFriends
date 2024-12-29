import { User } from "./User";

export interface IUserRepository {
    IsExists(email: string, userId: string, username: string): Promise<boolean>;
    Save(user: User): Promise<void>;
    
}