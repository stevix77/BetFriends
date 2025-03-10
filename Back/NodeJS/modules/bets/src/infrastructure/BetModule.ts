import { Behavior } from "../../../shared/application/abstractions/Behavior";
import { IBetModule } from "../application/Abstractions/IBetModule";
import { IRequest } from "../../../shared/application/Request/IRequest";

export class BetModule implements IBetModule {
    constructor(private behavior: Behavior) {}

    Execute<T>(request: IRequest<T>) : Promise<T> {
        return this.behavior.Execute(request);
    }
}