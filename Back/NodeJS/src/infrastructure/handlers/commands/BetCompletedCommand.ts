import { ICommand } from "../../../application/Abstractions/Request/ICommand";
import { IRequestHandler } from "../../../application/Abstractions/Request/IRequestHandler";
import { BetCompletedNotification } from "../notifications/betCompleted/BetCompletedNotification";
import { IMediator } from "../../Mediator";

export class BetCompletedCommand implements ICommand {
    Name: string = BetCompletedCommand.name;
    constructor(public BetId: string, public IsSuccessful: boolean) {}
}

export class BetCompletedCommandHandler implements IRequestHandler<BetCompletedCommand, void> {
    constructor(private mediator: IMediator) {}
    async Handle(request: BetCompletedCommand): Promise<void> {
        const notification = new BetCompletedNotification(request.BetId, request.IsSuccessful);
        await this.mediator.Publish(notification);
    }
    GetRequestType(): string {
        return BetCompletedCommand.name;
    }
}