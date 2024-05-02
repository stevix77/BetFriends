import { IMemberRepository } from "../../../domain/members/IMemberRepository";
import { MemberDoesNotExistException } from "../../../domain/members/exceptions/MemberDoesNotExistException";
import { INotificationHandler } from "../../Abstractions/Request/INotificationHandler";
import { BetCreatedNotification } from "./BetCreatedNotification";

export class DecreaseBalanceMemberHandler implements INotificationHandler<BetCreatedNotification> {
    constructor(private memberRepository: IMemberRepository){}
    async Handle(notification: BetCreatedNotification): Promise<void> {
        const member = await this.memberRepository.GetByIdAsync(notification.MemberId);
        if(!member) {
            throw new MemberDoesNotExistException();
        }
        member.DecreaseBalance(notification.Chips);
        await this.memberRepository.Save(member);
        
    }
    
}