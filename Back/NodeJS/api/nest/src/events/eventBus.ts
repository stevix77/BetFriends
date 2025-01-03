import { EventEmitter2 } from "@nestjs/event-emitter";
import { IEventBus } from "../../../../modules/shared/infrastructure/events/IEventBus";
import { Inject } from "@nestjs/common";
import { IIntegrationEvent } from "../../../../modules/shared/infrastructure/integrationEvents/IIntegrationEvent";

export class EventBus implements IEventBus {
    constructor(@Inject(EventEmitter2) private eventEmitter: EventEmitter2){}
    async Publish(event: IIntegrationEvent): Promise<void> {
        await this.eventEmitter.emitAsync(event.Type.toLocaleLowerCase(), JSON.stringify(event));
    }

}