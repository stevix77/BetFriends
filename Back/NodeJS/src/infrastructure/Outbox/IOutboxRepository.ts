import { Outbox } from "./Outbox";

export interface IOutboxRepository {
    GetAll(): Promise<Outbox[]>;
    Save(outbox: Outbox): Promise<void>;
    
}