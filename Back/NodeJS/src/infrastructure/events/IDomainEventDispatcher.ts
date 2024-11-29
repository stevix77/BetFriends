export interface IDomainEventDispatcher {
    Dispatch(): Promise<void>;
}