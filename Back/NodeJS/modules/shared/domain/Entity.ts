import { IDomainEvent } from "./IDomainEvent";

export abstract class Entity {
    private domainEvents: IDomainEvent[] = [];
    public DomainEvents: IDomainEvent[] = this.domainEvents;

    protected AddDomainEvent(event: IDomainEvent) {
        this.domainEvents.push(event);
    }
}