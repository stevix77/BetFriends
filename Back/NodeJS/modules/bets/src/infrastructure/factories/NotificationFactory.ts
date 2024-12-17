import { INotification } from "../../../../shared/application/Request/INotification"
import { BetCompletedEventNotification } from "../../application/features/complete-bet/BetCompletedEventNotification"
import { BetCreatedEventNotification } from "../../application/features/create-bet/BetCreatedEventNotification"
import { BetCompleted } from "../../domain/bets/events/BetCompleted"
import { BetCreated } from "../../domain/bets/events/BetCreated"

export interface INotificationFactory {
    Create(eventType: string, data: string): INotification
}

export class NotificationFactory implements INotificationFactory {
    Create(eventType: string, data: string): INotification {
        switch(eventType) {
            case BetCompleted.name:
                const betCompleted = JSON.parse(data) as BetCompleted
                return new BetCompletedEventNotification(betCompleted.BetId.Value, betCompleted.IsSuccessful)
            case BetCreated.name:
                const betCreated = JSON.parse(data) as BetCreated
                return new BetCreatedEventNotification(betCreated.BetId.Value)
            default:
                return undefined;
        }
    }

}