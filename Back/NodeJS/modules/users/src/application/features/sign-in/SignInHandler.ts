import { IAuthenticationGateway } from "../../abstractions/IAuthenticationGateway";
import { IHashPassword } from "../../abstractions/IHashPassword";
import { SignInRequest } from "./SignInQuery"

// @QueryHandler(SignInRequest)
export class SignInHandler  {
    constructor(private readonly authenticationGateway: IAuthenticationGateway,
                private readonly hashPassword: IHashPassword
    ){}
    execute(query: SignInRequest): Promise<Authenticate> {
        const password = this.hashPassword.Hash(query.Password)
        return this.authenticationGateway.Authenticate(query.Email, password)
    }
}

export interface Authenticate {
    AccessToken: string;
    RefreshToken: string;
}