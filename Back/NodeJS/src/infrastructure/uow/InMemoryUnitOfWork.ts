import { IUnitOfWork } from "./IUnitOfWork";
export class InMemoryUnitOfWork implements IUnitOfWork {
    Rollback(): Promise<void> {
        return Promise.resolve();
    }
    Commit(): Promise<void> {
        return Promise.resolve();
    }
    Begin(): Promise<void> {
        return Promise.resolve();
    }

}