import { INotification } from "../../../../shared/application/Request/INotification"

export class DomainEventNotificationFactory {
    Create(type: string, data: string): INotification {
        switch(type) {
            default:
                return undefined!;
        }
    }

}