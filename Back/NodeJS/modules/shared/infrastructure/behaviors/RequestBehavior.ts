import { Behavior } from "../../application/abstractions/Behavior";
import { IRequestHandler } from '../../application/Request/IRequestHandler';
import { IRequest, Request } from '../../application/Request/IRequest';
import { INotificationHandler } from "../../application/Request/INotificationHandler";
import { INotification } from "../../application/Request/INotification";
import { IMediator } from "../Mediator";
import { ICommand } from "../../application/Request/ICommand";

export class RequestBehavior implements Behavior {
    constructor(private readonly mediator: IMediator) {}
    
    async Execute<T>(request: Request): Promise<T> {
        if(request instanceof INotification) {
            await this.mediator.Publish(request);
            return Promise.resolve(undefined!);
        }

        if(request instanceof ICommand || 
            request instanceof IRequest) {
            return await this.mediator.Send(request);
        }

        return Promise.reject();
        
    }
    SetNext(behavior: Behavior): Behavior {
        this.Behavior = behavior;
        return behavior;
    }
    Behavior: Behavior;

}