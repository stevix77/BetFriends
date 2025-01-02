import { IOutboxAccessor } from "../../../../shared/infrastructure/outbox/IOutboxAccessor";
import { Outbox } from "../../../../shared/infrastructure/outbox/Outbox";

export class InMemoryOutboxAccessor implements IOutboxAccessor {
    private readonly outboxes: Outbox[] = [];
    GetAll(): Promise<Outbox[]> {
        return Promise.resolve(this.outboxes.filter(x => x.HandledAt == undefined));
    }
    Save(outbox: Outbox): Promise<void> {
        this.outboxes.push(outbox);
        return Promise.resolve();
    }

}