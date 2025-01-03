import { ICommand } from '../../../../shared/application/Request/ICommand';
import { IRequestHandler } from '../../../../shared/application/Request/IRequestHandler';
import { IDateTimeProvider } from '../../../../shared/domain/IDateTimeProvider';
import { IOutboxAccessor } from '../../../../shared/infrastructure/outbox/IOutboxAccessor';
import { IEventBus } from '../../../../shared/infrastructure/events/IEventBus';
import { IntegrationEventFactory } from '../integrationEvents/IntegrationEventFactory';

export class ProcessOutboxCommand extends ICommand {
    Name: string = ProcessOutboxCommand.name;
}

export class ProcessOutboxCommandHandler implements IRequestHandler<ProcessOutboxCommand, void> {
    constructor(
        private readonly outboxAccessor: IOutboxAccessor,
        private readonly dateProvider: IDateTimeProvider,
        private readonly integrationEventFactory: IntegrationEventFactory,
        private readonly eventBus: IEventBus
    ) {}

    async Handle(request: ProcessOutboxCommand): Promise<void> {
        const outboxes = await this.outboxAccessor.GetAll();
        for(let item of outboxes) {
            const integrationEvent = this.integrationEventFactory.Create(item.Type, item.Data);
            if(integrationEvent != undefined) {
                this.eventBus.Publish(integrationEvent)
                item.Handled(this.dateProvider);
                await this.outboxAccessor.Save(item);
            }
        }
    }
    GetRequestType(): string {
        return ProcessOutboxCommand.name
    }

}