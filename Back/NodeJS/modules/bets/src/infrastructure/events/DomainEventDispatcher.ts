import { IDomainEvent } from "../../../../shared/domain/IDomainEvent";
import { IDateTimeProvider } from "../../../../shared/domain/IDateTimeProvider";
import { DomainEventAccessor } from "../../../../shared/infrastructure/events/DomainEventAccessor";
import { IDomainEventDispatcher } from "../../../../shared/infrastructure/events/IDomainEventDispatcher";
import  {v4 as uuidv4} from 'uuid';
import { IOutboxAccessor } from "../../../../shared/infrastructure/outbox/IOutboxAccessor";
import { INotificationHandler } from '../../../../shared/application/Request/INotificationHandler';
import { DomainEventNotificationFactory } from './DomainEventNotificationFactory';
import { Outbox } from "../../../../shared/infrastructure/outbox/Outbox";

export class DomainEventDispatcher implements IDomainEventDispatcher {
    
    constructor(private readonly domainEventAccessor: DomainEventAccessor,
                private readonly outboxAccessor: IOutboxAccessor,
                private readonly dateProvider: IDateTimeProvider,
                private readonly domainEventNotificationFactory: DomainEventNotificationFactory,
                private readonly notificationHandlers: INotificationHandler<any>[]
    ){}
    
    async Dispatch(): Promise<void> {
        const events: IDomainEvent[] = [...this.domainEventAccessor.GetEvents()]
        this.domainEventAccessor.Clear();
        for(let event of events) {
            const notification = this.domainEventNotificationFactory.Create(event.Type, JSON.stringify(event));
            if(notification) {
                const handlers = this.GetHandlers(notification.Name);
                handlers.forEach(x => x.Handle(notification));
            }
        }

        await this.SaveEvents(events);
    }

    private async SaveEvents(events: IDomainEvent[]) {
        for(let event of events) {
            const outbox = new Outbox(uuidv4(), event.Type, JSON.stringify(event), this.dateProvider.GetDate());
            await this.outboxAccessor.Save(outbox);
        }
    }

    private GetHandlers(notificationName: string): INotificationHandler<any>[] {
        return this.notificationHandlers.filter(x => x.GetRequestType() == notificationName)
    }

}