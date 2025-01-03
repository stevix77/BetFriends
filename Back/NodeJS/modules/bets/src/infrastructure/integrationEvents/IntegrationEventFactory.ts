import { Outbox } from "../../../../shared/infrastructure/outbox/Outbox";
import { IIntegrationEvent } from '../../../../shared/infrastructure/integrationEvents/IIntegrationEvent';
import { BetCompleted } from "../../domain/bets/events/BetCompleted";
import { BetCreated } from "../../domain/bets/events/BetCreated";
import { BetCreatedIntegrationEvent } from './BetCreatedIntegrationEvent';
import { BetCompletedIntegrationEvent } from './BetCompletedIntegrationEvent';

export class IntegrationEventFactory {
    Create(outbox: Outbox): IIntegrationEvent {
        switch(outbox.Type) {
            case BetCompleted.name:
                const betCompleted = JSON.parse(outbox.Data) as BetCompleted
                return new BetCompletedIntegrationEvent(betCompleted.BetId.Value, betCompleted.IsSuccessful)
            case BetCreated.name:
                const betCreated = JSON.parse(outbox.Data) as BetCreated
                return new BetCreatedIntegrationEvent(betCreated.BetId.Value)
            default:
                return undefined;
        }
    }

}