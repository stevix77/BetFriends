import { IDomainEvent } from "../../domain/IDomainEvent";
import { IDateTimeProvider } from "../../domain/IDateTimeProvider";
import { DomainEventAccessor } from "./DomainEventAccessor";
import { IDomainEventDispatcher } from "./IDomainEventDispatcher";
import { IOutboxRepository } from "../Outbox/IOutboxRepository";
import  {v4 as uuidv4} from 'uuid';
import { Outbox } from "../Outbox/Outbox";
import { EventEmitter2 } from "@nestjs/event-emitter";

export class DomainEventDispatcher implements IDomainEventDispatcher {
    
    constructor(private domainEventAccessor: DomainEventAccessor,
                private outboxRepository: IOutboxRepository,
                private dateProvider: IDateTimeProvider,
                private eventEmitter: EventEmitter2
    ){}
    
    async Dispatch(): Promise<void> {
        const events: IDomainEvent[] = [...this.domainEventAccessor.GetEvents()]
        this.domainEventAccessor.Clear();
        for(let event of events) {
            await this.eventEmitter.emitAsync(event.Type, event)
        }

        for(let event of events) {
            const outbox = new Outbox(uuidv4(), typeof event, JSON.stringify(event), this.dateProvider);
            await this.outboxRepository.Save(outbox);
        }
    }

}