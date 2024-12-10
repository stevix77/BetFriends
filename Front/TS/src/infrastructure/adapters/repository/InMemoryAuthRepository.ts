import { AuthToken, IAuthRepository } from "../../../domain/features/LoginHandler";

export class InMemoryAuthRepository implements IAuthRepository {
    constructor(){}
    Login(credentials: { email: string; password: string; }): Promise<AuthToken> {
        if(credentials.email == "email@email.fr" && credentials.password == "hashedpassword") {
            return Promise.resolve({
                AccessToken: "accesstoken",
                RefreshToken: "refreshtoken"
            });
        }
        return Promise.resolve(undefined!)
    }

}