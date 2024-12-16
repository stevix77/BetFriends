import { IOutboxRepository } from "../Outbox/IOutboxRepository";
import { Outbox } from "../Outbox/Outbox";

export class InMemoryOutboxRepository implements IOutboxRepository {
    GetAll(): Promise<Outbox[]> {
        return Promise.resolve(this.outboxes.filter(x => x.HandledAt == undefined))
    }
    private outboxes: Outbox[] = [];
    Save(outbox: Outbox): Promise<void> {
        if(!this.outboxes.some(x => x.Id == outbox.Id)) {
            this.outboxes.push(outbox)
        }
        return Promise.resolve();
    }

}