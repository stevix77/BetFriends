import { IOutboxRepository } from "../Outbox/IOutboxRepository";
import { Outbox } from "../Outbox/Outbox";

export class InMemoryOutboxRepository implements IOutboxRepository {
    private outboxes: Outbox[] = [];
    Save(outbox: Outbox): Promise<void> {
        this.outboxes.push(outbox)
        return Promise.resolve();
    }

}