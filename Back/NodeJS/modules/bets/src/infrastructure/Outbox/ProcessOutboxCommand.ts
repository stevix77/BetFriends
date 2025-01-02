import { ICommand } from "../../../../shared/application/Request/ICommand"
import { IRequestHandler } from "../../../../shared/application/Request/IRequestHandler";
import { IDateTimeProvider } from "../../../../shared/domain/IDateTimeProvider";
import { IOutboxAccessor } from "../../../../shared/infrastructure/outbox/IOutboxAccessor";
import { INotificationFactory } from "../factories/NotificationFactory"
import { INotificationHandler } from "../../../../shared/application/Request/INotificationHandler";
import { INotification } from "../../../../shared/application/Request/INotification";
import { IBetModule } from "../../application/Abstractions/IBetModule";

export class ProcessOutboxCommand implements ICommand {
    Name: string = ProcessOutboxCommand.name;
}

export class ProcessOutboxCommandHandler implements IRequestHandler<ProcessOutboxCommand, void> {
    constructor(
        private readonly outboxAccessor: IOutboxAccessor,
                private readonly dateProvider: IDateTimeProvider,
                private readonly notificationFactory: INotificationFactory,
                private readonly betModule: IBetModule
    ) {}

    async Handle(request: ProcessOutboxCommand): Promise<void> {
        const outboxes = await this.outboxAccessor.GetAll();
        for(let item of outboxes) {
            const notification = this.notificationFactory.Create(item.Type, item.Data);
            if(notification != undefined) {
                await this.betModule.Execute(notification);
                item.Handled(this.dateProvider);
                await this.outboxAccessor.Save(item);
            }
        }
    }
    GetRequestType(): string {
        return ProcessOutboxCommand.name
    }

}