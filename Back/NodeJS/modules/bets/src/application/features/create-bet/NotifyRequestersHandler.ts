import { INotificationHandler } from "../../../../../shared/application/Request/INotificationHandler";
import { BetCreatedEventNotification } from "./BetCreatedEventNotification";

export class NotifyRequestersHandler implements INotificationHandler<BetCreatedEventNotification> {
    Handle(notification: BetCreatedEventNotification): Promise<void> {
        console.log(`NotifyRequestersHandler: ${JSON.stringify(notification)}`)
        return Promise.resolve();
    }
    GetRequestType(): string {
        return BetCreatedEventNotification.name
    }

}