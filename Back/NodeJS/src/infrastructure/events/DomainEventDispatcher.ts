import { IDomainEvent } from "../../domain/IDomainEvent";
import { IDateTimeProvider } from "../../domain/IDateTimeProvider";
import { DomainEventAccessor } from "./DomainEventAccessor";
import { ICommandFactory } from "../factories/ICommandFactory";
import { IDomainEventDispatcher } from "./IDomainEventDispatcher";
import { IOutboxRepository } from "../Outbox/IOutboxRepository";
import  {v4 as uuidv4} from 'uuid';
import { Outbox } from "../Outbox/Outbox";
import { EventEmitter2 } from "@nestjs/event-emitter";

export class DomainEventDispatcher implements IDomainEventDispatcher {
    
    constructor(private domainEventAccessor: DomainEventAccessor,
                private commandFactory: ICommandFactory,
                private outboxRepository: IOutboxRepository,
                private dateProvider: IDateTimeProvider,
                private eventEmitter: EventEmitter2
    ){}
    
    async Dispatch(): Promise<void> {
        const events: IDomainEvent[] = [...this.domainEventAccessor.GetEvents()]
        this.domainEventAccessor.Clear();
        for(let event of events) {
            const command = this.commandFactory.Create(event);
            if(command) {
                await this.eventEmitter.emitAsync(command.Name, command)
            }
        }

        for(let event of events) {
            console.log(`event typeof: ${typeof event}`)
            const outbox = new Outbox(uuidv4(), typeof event, JSON.stringify(event), this.dateProvider);
            await this.outboxRepository.Save(outbox);
        }
    }

}