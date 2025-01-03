import { INotification } from '../../../../shared/application/Request/INotification';
import { BetCompleted } from '../../domain/bets/events/BetCompleted';
import { BetCreated } from '../../domain/bets/events/BetCreated';
import { BetCreatedNotification } from '../../application/features/create-bet/BetCreatedNotification';
import { BetCompletedNotification } from '../../application/features/complete-bet/BetCompletedNotification';
import { BetAnswered } from '../../domain/answerBets/events/BetAnswered';
import { BetAnsweredNotification } from '../../application/features/answer-bet/BetAnsweredNotification';
export class DomainEventNotificationFactory {
    Create(type: string, data: string): INotification {
        switch(type) {
            case BetCreated.name:
                const betCreated = JSON.parse(data) as BetCreated
                return new BetCreatedNotification(betCreated.BetId, betCreated.MemberId, betCreated.Coins)
            case BetCompleted.name:
                const betCompleted = JSON.parse(data) as BetCompleted
                return new BetCompletedNotification(betCompleted.BetId.Value, betCompleted.IsSuccessful)
            case BetAnswered.name:
                const betAnswered = JSON.parse(data) as BetAnswered
                return new BetAnsweredNotification(betAnswered.BetId.Value, betAnswered.GamblerId.Value, betAnswered.Answer)
            default:
                return undefined;
        }
    }

}