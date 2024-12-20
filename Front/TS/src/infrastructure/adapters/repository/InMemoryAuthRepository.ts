import { AuthToken, IAuthRepository } from "../../../domain/features/LoginHandler";
import { InMemoryUserRepository } from './InMemoryUserRepository';

export class InMemoryAuthRepository implements IAuthRepository {
    constructor(private readonly userRepository :InMemoryUserRepository){}
    Login(credentials: { email: string; password: string; }): Promise<AuthToken> {
        if(this.userRepository.users.some(x => x.email == credentials.email && x.password == credentials.password)) {
            return Promise.resolve({
                AccessToken: "accesstoken",
                RefreshToken: "refreshtoken"
            });
        }
        return Promise.resolve(undefined!)
    }

}