import { Behavior } from "../../application/abstractions/Behavior";
import { IRequestHandler } from '../../application/Request/IRequestHandler';
import { IRequest, Request } from '../../application/Request/IRequest';
import { INotificationHandler } from "../../application/Request/INotificationHandler";
import { INotification } from "../../application/Request/INotification";
import { IMediator } from "../Mediator";
import { ICommand } from "../../application/Request/ICommand";

// export class RequestBehavior implements Behavior {

//     constructor(private requestHandlers: IRequestHandler<Request, any>[], 
//                 private notificationHandlers: INotificationHandler<INotification>[]) {}
//     Behavior: Behavior | undefined = undefined;
//     async Execute<T>(request: IRequest<T>): Promise<T> {
//         const handler = this.requestHandlers.find(x => x.GetRequestType() == request.Name);
//         if(handler) {
//             return await handler.Handle(request);
//         }

//         const handlers = this.notificationHandlers.filter(x => x.GetRequestType() == request.Name);
//         if(handlers.length == 0) {
//             return Promise.reject(`Request ${request.Name} is unknown`)
//         }
        
//         const promises = handlers.map(x => x.Handle(request));
//         const result = await Promise.allSettled(promises);
//         if(result.some(x => x.status == "rejected"))
//             return Promise.reject();
//         return Promise.resolve(undefined!);
//     }

//     SetNext(behavior: Behavior): Behavior{
//         this.Behavior = behavior;
//         return behavior;
//     }

// }

export class RequestBehavior implements Behavior {
    constructor(private readonly mediator: IMediator) {}
    
    async Execute<T>(request: Request): Promise<T> {
        if(request instanceof INotification) {
            await this.mediator.Publish(request);
            return;
        }

        return await this.mediator.Send(request);
    }
    SetNext(behavior: Behavior): Behavior {
        this.Behavior = behavior;
        return behavior;
    }
    Behavior: Behavior;

}