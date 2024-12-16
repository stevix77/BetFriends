import { IDomainEvent } from "../../domain/IDomainEvent";

export class DomainEventAccessor {
    Clear() {
        this.events = [];
    }
    private events: IDomainEvent[] = []

    GetEvents() {
        return this.events;
    }

    AddEvents(events: IDomainEvent[]) {
        this.events.push(...events);
    }
}