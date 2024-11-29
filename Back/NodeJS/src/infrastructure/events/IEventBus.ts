import { IDomainEvent } from "../../domain/IDomainEvent";

export interface IEventBus {
    Publish(event: IDomainEvent): Promise<void>;

}