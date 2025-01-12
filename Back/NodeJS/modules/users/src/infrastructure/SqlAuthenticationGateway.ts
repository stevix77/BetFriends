import { IAuthenticationGateway } from "../application/abstractions/IAuthenticationGateway";
import { Authenticate } from "../application/features/sign-in/signInHandler";
import { ITokenGenerator } from "../application/abstractions/ITokenGenerator";
import { UserEntity } from "./dataaccess/UserEntity";
import { UserContext } from "./dataAccess/UserContext";
import { User } from "../domain/users/User";
import { UserSnapshot } from "../domain/users/UserSnapshot";
import { IJwtTokenGenerator } from "./IJwtTokenGenerator";

export class SqlAuthenticationGateway implements IAuthenticationGateway {

    constructor(private readonly userContext: UserContext,
        private readonly jwtTokenGenerator: IJwtTokenGenerator
    ){}
    
    async Authenticate(email: string, password: string): Promise<Authenticate> {
        const entity = await this.userContext.UserEntity.findOneBy({
            Email: email,
            Password: password
        });
        if(!entity) {
            return undefined!;
        }
        return {
            RefreshToken: entity.RefreshToken,
            AccessToken: this.jwtTokenGenerator.Generate({
                Email: entity.Email,
                Username: entity.Username,
                UserId: entity.Id
            })
        }
    }

}