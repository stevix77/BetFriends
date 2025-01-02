import { Outbox } from "./Outbox";

export interface IOutboxAccessor {
    GetAll(): Promise<Outbox[]>;
    Save(outbox: Outbox): Promise<void>;
    
}