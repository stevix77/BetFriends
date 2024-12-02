import { Outbox } from "./Outbox";

export interface IOutboxRepository {
    Save(outbox: Outbox): Promise<void>;
    
}