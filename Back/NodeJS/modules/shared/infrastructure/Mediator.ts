import { INotification } from "../application/Request/INotification";
import { IRequest, Request } from "../application/Request/IRequest";
import { INotificationHandler } from "../application/Request/INotificationHandler";
import { IRequestHandler } from "../Application/Request/IRequestHandler";

export interface IMediator {
    Send<T>(request: IRequest<T>): Promise<T>;
    Publish(notification: INotification): Promise<void>;
}

export class Mediator implements IMediator{
    constructor(private requestHandlers: IRequestHandler<Request, any>[],  
                private notificationHandlers: INotificationHandler<INotification>[]) {}

    Send<T>(request: IRequest<T>): Promise<T> {
        const handler = this.requestHandlers.find(x => x.GetRequestType() == request.Name);
        if(handler) {
            return handler.Handle(request);
        }
        return Promise.reject(`Request ${request.Name} is unknown`)
    }

    async Publish(notification: INotification): Promise<void> {
        const handlers = this.notificationHandlers.filter(x => x.GetRequestType() == notification.Name);
        if(handlers.length == 0) {
            return Promise.reject(`Notification ${notification.Name} is unknown`)
        }

        const promises = handlers.map(x => x.Handle(notification));
        const result = await Promise.allSettled(promises);
        if(result.some(x => x.status == "rejected"))
            return Promise.reject();
        return Promise.resolve(undefined!);
    }
}