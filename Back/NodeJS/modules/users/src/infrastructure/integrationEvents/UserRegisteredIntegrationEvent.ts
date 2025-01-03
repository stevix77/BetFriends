import { IIntegrationEvent } from "../../../../shared/infrastructure/integrationEvents/IIntegrationEvent";

export class UserRegisteredIntegrationEvent implements IIntegrationEvent {
    Type: string = UserRegisteredIntegrationEvent.name;
    constructor(public readonly UserId: string,
        public readonly Username: string,
        public readonly Email: string) {}

}