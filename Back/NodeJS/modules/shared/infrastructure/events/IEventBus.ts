import { IIntegrationEvent } from '../integrationEvents/IIntegrationEvent';

export interface IEventBus {
    Publish(integrationEvent: IIntegrationEvent): Promise<void>;

}