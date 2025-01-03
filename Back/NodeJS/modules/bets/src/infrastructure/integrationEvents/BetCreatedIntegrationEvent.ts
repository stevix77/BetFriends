import { IIntegrationEvent } from '../../../../shared/infrastructure/integrationEvents/IIntegrationEvent';

export class BetCreatedIntegrationEvent implements IIntegrationEvent {
    Type: string = BetCreatedIntegrationEvent.name;

    constructor(public readonly BetId: string) {}

}