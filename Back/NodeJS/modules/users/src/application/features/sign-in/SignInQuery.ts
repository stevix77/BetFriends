import { Authenticate } from "./SignInHandler";
import { IRequest } from "../../../../../shared/application/Request/IRequest";

export class SignInRequest extends IRequest<Authenticate> {
    constructor(public readonly Email: string, public readonly  Password: string){
        super();
    }
    Name: string = SignInRequest.name;
    
}