import { UserRegistered } from '../../domain/users/UserRegistered';
import { UserRegisteredIntegrationEvent } from './UserRegisteredIntegrationEvent';
export class IntegrationEventFactory {
    Create(type: string, data: string) {
        switch(type) {
            case UserRegistered.name:
                const userRegistered = JSON.parse(data) as UserRegistered
                return new UserRegisteredIntegrationEvent(userRegistered.UserId.Value, userRegistered.Username, userRegistered.Email)
            default:
                return undefined;
        }
    }
    
}