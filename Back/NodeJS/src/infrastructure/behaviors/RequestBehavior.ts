import { Behavior } from "../../application/Abstractions/Behavior";
import { IRequestHandler } from '../../application/Abstractions/Request/IRequestHandler';
import { IRequest, Request } from '../../application/Abstractions/Request/IRequest';
import { INotificationHandler } from "../../application/Abstractions/Request/INotificationHandler";
import { INotification } from "../../application/Abstractions/Request/INotification";

export class RequestBehavior implements Behavior {

    constructor(private requestHandlers: IRequestHandler<Request, any>[], 
                private notificationHandlers: INotificationHandler<INotification>[]) {}
    Behavior: Behavior | undefined = undefined;
    async Execute<T>(request: IRequest<T>): Promise<T> {
        const handler = this.requestHandlers.find(x => x.GetRequestType() == request.Name);
        if(handler) {
            return await handler.Handle(request);
        }

        const handlers = this.notificationHandlers.filter(x => x.GetRequestType() == request.Name);
        if(handlers.length == 0) {
            return Promise.reject(`Request ${request.Name} is unknown`)
        }
        
        const promises = handlers.map(x => x.Handle(request));
        const result = await Promise.allSettled(promises);
        if(result.some(x => x.status == "rejected"))
            return Promise.reject();
        return Promise.resolve(undefined!);
    }

    SetNext(behavior: Behavior): Behavior{
        this.Behavior = behavior;
        return behavior;
    }

}