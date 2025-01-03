import { IIntegrationEvent } from '../../../../shared/infrastructure/integrationEvents/IIntegrationEvent';
export class BetCompletedIntegrationEvent implements IIntegrationEvent {
    Type: string = BetCompletedIntegrationEvent.name;
    constructor(public readonly BetId: string, public readonly IsSuccessful: boolean) {}
}