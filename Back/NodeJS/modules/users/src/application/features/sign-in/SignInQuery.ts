import { Authenticate } from "./SignInHandler";
import { IRequest } from "../../../../../shared/application/Request/IRequest";

export class SignInRequest implements IRequest<Authenticate> {
    constructor(public readonly Email: string, public readonly  Password: string){}
    Name: string = SignInRequest.name;
    
}