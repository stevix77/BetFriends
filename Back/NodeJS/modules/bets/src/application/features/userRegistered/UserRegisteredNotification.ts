import { INotification } from '../../../../../shared/application/Request/INotification';
export class UserRegisteredNotification extends INotification {
    constructor(public readonly UserId: string, 
        public readonly Username: string,
        public readonly Email: string) {
            super()
        }
    Name: string = UserRegisteredNotification.name;
}