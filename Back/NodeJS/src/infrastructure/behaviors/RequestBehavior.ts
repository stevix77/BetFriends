import { Behavior } from "../../application/Abstractions/Behavior";
import { IRequestHandler } from '../../application/Abstractions/Request/IRequestHandler';
import { IRequest, Request } from '../../application/Abstractions/Request/Request';

export class RequestBehavior implements Behavior {

    constructor(private requestHandlers: IRequestHandler<Request, any>[]) {}
    Behavior: Behavior | undefined = undefined;
    async Execute<T>(request: IRequest<T>): Promise<T> {
        const handler = this.requestHandlers.find(x => x.GetRequestType() == request.Name);
        if(handler) {
            return await handler.Handle(request);
        }
        
        return Promise.reject(`IRequest ${request.Name} is unknown`)
    }

    SetNext(behavior: Behavior): Behavior{
        this.Behavior = behavior;
        return this;
    }

}