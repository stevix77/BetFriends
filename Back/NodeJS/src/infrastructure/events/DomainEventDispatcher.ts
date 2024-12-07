import { IDomainEvent } from "../../domain/IDomainEvent";
import { IDateTimeProvider } from "../../domain/IDateTimeProvider";
import { DomainEventAccessor } from "./DomainEventAccessor";
import { IDomainEventDispatcher } from "./IDomainEventDispatcher";
import { IOutboxRepository } from "../Outbox/IOutboxRepository";
import  {v4 as uuidv4} from 'uuid';
import { Outbox } from "../Outbox/Outbox";
import { IEventBus } from "./IEventBus";

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