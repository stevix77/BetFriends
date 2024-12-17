import { IDomainEvent } from "../../../../shared/domain/IDomainEvent";
import { IDateTimeProvider } from "../../../../shared/domain/IDateTimeProvider";
import { DomainEventAccessor } from "../../../../shared/infrastructure/events/DomainEventAccessor";
import { IDomainEventDispatcher } from "../../../../shared/infrastructure/events/IDomainEventDispatcher";
import { IOutboxRepository } from "../Outbox/IOutboxRepository";
import  {v4 as uuidv4} from 'uuid';
import { Outbox } from "../Outbox/Outbox";
import { IEventBus } from "../../../../shared/infrastructure/events/IEventBus";

export class DomainEventDispatcher implements IDomainEventDispatcher {
    
    constructor(private domainEventAccessor: DomainEventAccessor,
                private outboxRepository: IOutboxRepository,
                private dateProvider: IDateTimeProvider,
                private eventBus: IEventBus
    ){}
    
    async Dispatch(): Promise<void> {
        const events: IDomainEvent[] = [...this.domainEventAccessor.GetEvents()]
        this.domainEventAccessor.Clear();
        for(let event of events) {
            await this.eventBus.Publish(event)
        }

        for(let event of events) {
            const outbox = new Outbox(uuidv4(), event.Type, JSON.stringify(event), this.dateProvider);
            await this.outboxRepository.Save(outbox);
        }
    }

}