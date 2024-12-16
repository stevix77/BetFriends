import { ICommand } from "../../application/Abstractions/Request/ICommand"
import { IRequestHandler } from "../../application/Abstractions/Request/IRequestHandler";
import { IDateTimeProvider } from "../../domain/IDateTimeProvider";
import { IOutboxRepository } from "./IOutboxRepository";
import { INotificationFactory } from "../factories/NotificationFactory"
import { INotificationHandler } from "../../application/Abstractions/Request/INotificationHandler";
import { INotification } from "../../application/Abstractions/Request/INotification";

export class ProcessOutboxCommand implements ICommand {
    Name: string = ProcessOutboxCommand.name;
}

export class ProcessOutboxCommandHandler implements IRequestHandler<ProcessOutboxCommand, void> {
    constructor(private readonly outboxRepository: IOutboxRepository,
                private readonly dateProvider: IDateTimeProvider,
                private readonly notificationFactory: INotificationFactory,
                private readonly notificationHandlers: INotificationHandler<INotification>[]
    ) {}

    async Handle(request: ProcessOutboxCommand): Promise<void> {
        const outboxes = await this.outboxRepository.GetAll();
        for(let item of outboxes) {
            const notification = this.notificationFactory.Create(item.Type, item.Data);
            if(notification != undefined) {
                const handlers = this.notificationHandlers.filter(x => x.GetRequestType() == notification.Name)
                await Promise.allSettled(handlers.map(x => x.Handle(notification)));
                item.Handled(this.dateProvider);
                await this.outboxRepository.Save(item);
            }
        }
    }
    GetRequestType(): string {
        return ProcessOutboxCommand.name
    }

}