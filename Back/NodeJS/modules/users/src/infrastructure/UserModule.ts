import { Behavior } from "../../../shared/application/abstractions/Behavior";
import { IRequest } from "../../../shared/application/Request/IRequest";
import { IUserModule } from "../application/abstractions/IUserModule";

export class UserModule implements IUserModule {
    constructor(private behavior: Behavior) {}
    Execute<T>(request: IRequest<T>): Promise<T> {
        return this.behavior.Execute(request);
    }

}