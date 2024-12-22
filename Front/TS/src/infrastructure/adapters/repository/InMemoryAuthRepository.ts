import { IUserContext } from "../../../domain/abstractions/IUserContext";
import { AuthToken, IAuthRepository } from "../../../domain/features/LoginHandler";
import { InMemoryUserRepository } from './InMemoryUserRepository';

export class InMemoryAuthRepository implements IAuthRepository {
    constructor(private readonly userRepository :InMemoryUserRepository, private readonly userContext: IUserContext){}
    Login(credentials: { email: string; password: string; }): Promise<AuthToken> {
        const user = this.userRepository.users.find(x => x.email == credentials.email && x.password == credentials.password)
        if(user != undefined) {
            this.userContext.UserId = user.id
            return Promise.resolve({
                AccessToken: "accesstoken",
                RefreshToken: "refreshtoken"
            });
        }
        return Promise.resolve(undefined!)
    }

}