import { IRequestHandler } from "../../../../../shared/application/Request/IRequestHandler";
import { IAuthenticationGateway } from "../../abstractions/IAuthenticationGateway";
import { IHashPassword } from "../../abstractions/IHashPassword";
import { SignInRequest } from "./SignInQuery"

export class SignInHandler implements IRequestHandler<SignInRequest, Authenticate>  {
    constructor(private readonly authenticationGateway: IAuthenticationGateway,
                private readonly hashPassword: IHashPassword
    ){}
    Handle(request: SignInRequest): Promise<Authenticate> {
        const password = this.hashPassword.Hash(request.Password)
        return this.authenticationGateway.Authenticate(request.Email, password)
    }
    GetRequestType(): string {
        return SignInRequest.name;
    }
}

export interface Authenticate {
    AccessToken: string;
    RefreshToken: string;
}