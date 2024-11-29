import { IDomainEvent } from "../../domain/IDomainEvent";

export class DomainEventAccessor {
    Clear() {
        throw new Error("Method not implemented.");
    }
    private events: IDomainEvent[] = []

    GetEvents() {
        return this.events;
    }

    AddEvents(events: IDomainEvent[]) {
        this.events.push(events);
    }
}