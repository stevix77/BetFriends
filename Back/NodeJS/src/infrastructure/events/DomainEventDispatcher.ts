import { IDomainEvent } from "../../domain/IDomainEvent";
import { DomainEventAccessor } from "./DomainEventAccessor";
import { IDomainEventDispatcher } from "./IDomainEventDispatcher";
import { IEventBus } from "./IEventBus";

export class DomainEventDispatcher implements IDomainEventDispatcher {
    
    constructor(private domainEventAccessor: DomainEventAccessor,
                private eventBus: IEventBus
    ){}
    
    async Dispatch(): Promise<void> {
        const events: IDomainEvent[] = [...this.domainEventAccessor.GetEvents()]
        this.domainEventAccessor.Clear();
        for(let event of events) {
            await this.eventBus.Publish(event);
        }
    }

}