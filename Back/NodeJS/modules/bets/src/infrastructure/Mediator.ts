import { INotification } from "../application/Abstractions/Request/INotification";
import { Behavior } from "../application/Abstractions/Behavior";
import { IRequest } from "../application/Abstractions/Request/IRequest";

export interface IMediator {
    Send<T>(query: IRequest<T>): Promise<T>;
    Publish(notification: INotification): Promise<void>;
}

export class Mediator implements IMediator{
    constructor(private behavior: Behavior) {}

    Send<T>(request: IRequest<T>): Promise<T> {
        return this.behavior.Execute(request);
    }

    async Publish(notification: INotification): Promise<void> {
        return this.behavior.Execute(notification);
    }
}