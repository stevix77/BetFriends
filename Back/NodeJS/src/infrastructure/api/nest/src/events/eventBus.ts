import { EventEmitter2 } from "@nestjs/event-emitter";
import { IDomainEvent } from "../../../../../domain/IDomainEvent";
import { IEventBus } from "../../../../events/IEventBus";
import { Inject } from "@nestjs/common";

export class EventBus implements IEventBus {
    constructor(@Inject(EventEmitter2) private eventEmitter: EventEmitter2){}
    async Publish(event: IDomainEvent): Promise<void> {
        await this.eventEmitter.emitAsync(event.Type, event);
    }

}