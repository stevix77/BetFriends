import { INotificationHandler } from "../../../../../shared/application/Request/INotificationHandler";
import { BetAnsweredNotification } from "./BetAnsweredNotification"
import { IMemberRepository } from "../../../domain/members/IMemberRepository"
import { MemberId } from "../../../domain/members/MemberId";
import { MemberDoesNotExistException } from "../../../domain/members/exceptions/MemberDoesNotExistException"
import { IBetRepository } from "../../../domain/bets/IBetRepository"
import { BetId } from "../../../domain/bets/BetId";

export class UpdateBalanceGamblerHandler implements INotificationHandler<BetAnsweredNotification> {
    constructor(private memberRepository: IMemberRepository,
                private betRepository: IBetRepository
    ) {}
    async Handle(notification: BetAnsweredNotification): Promise<void> {
        const member = await this.memberRepository.GetByIdAsync(new MemberId(notification.MemberId));
        const bet = await this.betRepository.GetById(new BetId(notification.BetId));
        if(!bet) throw new Error(`Bet ${notification.BetId} does not exist`);
        if(notification.Answer === true) {
            member!.DecreaseBalance(bet.Coins)
            await this.memberRepository.Save(member!);
        }

    }
    GetRequestType(): string {
        return BetAnsweredNotification.name
    }

}