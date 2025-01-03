import { INotificationHandler } from '../../../../../shared/application/Request/INotificationHandler';
import { IMemberRepository } from '../../../domain/members/IMemberRepository';
import { UserRegisteredNotification } from './UserRegisteredNotification';
import { Member } from '../../../domain/members/Member';

export class CreateMemberHandler implements INotificationHandler<UserRegisteredNotification> {

    constructor(private readonly memberRepository: IMemberRepository){}

    async Handle(notification: UserRegisteredNotification): Promise<void> {
        const member = Member.Create(notification.UserId, notification.Username);
        await this.memberRepository.Save(member);
    }
    GetRequestType(): string {
        return UserRegisteredNotification.name;
    }
    
}