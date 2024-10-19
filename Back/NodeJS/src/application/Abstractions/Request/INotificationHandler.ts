export interface INotificationHandler<T> {
    Handle(notification: T): Promise<void>;
}