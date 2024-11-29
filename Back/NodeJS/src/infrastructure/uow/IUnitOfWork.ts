export interface IUnitOfWork {
    Rollback(): Promise<void>;
    Commit(): Promise<void>;
    Begin(): Promise<void>;
}