import { ICommand } from "../../../shared/application/Request/ICommand";
import { IBetModule } from "../application/Abstractions/IBetModule";
import { INotification } from "../../../shared/application/Request/INotification";
import { IMediator } from "../infrastructure/Mediator";
import { IRequest } from "../../../shared/application/Request/IRequest";

export class BetModule implements IBetModule {
    constructor(private mediator: IMediator) {}
    ExecuteNotification(notification: INotification): Promise<void> {
        return this.mediator.Publish(notification);
    }

    ExecuteCommand(command: ICommand): Promise<void> {
        return this.mediator.Send(command);
    }

    ExecuteQuery<T>(query: IRequest<T>): Promise<T> {
        return this.mediator.Send(query);
    }
}