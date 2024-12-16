import { BetCompletedEventNotification } from "./BetCompletedEventNotification";
import { INotificationHandler } from "../../../../../shared/application/Request/INotificationHandler";
import { IAnswerBetRepository } from "../../../domain/answerBets/IAnswerBetRepository"
import { BetId } from "../../../domain/bets/BetId";
import { IMemberRepository } from "../../../domain/members/IMemberRepository"
import { IBetRepository } from "../../../domain/bets/IBetRepository"

export class NotifyGamblersBetCompletedHandler implements INotificationHandler<BetCompletedEventNotification> {
    constructor(private readonly answerBetRepository: IAnswerBetRepository,
                private readonly notifyCompletBetService: INotifyBetCompleted,
                private readonly memberRepository: IMemberRepository,
                private readonly betRepository: IBetRepository
    ){}
    async Handle(notification: BetCompletedEventNotification): Promise<void> {
        const answers = await this.answerBetRepository.GetAnswersForBet(new BetId(notification.BetId));
        const bet = await this.betRepository.GetById(new BetId(notification.BetId))
        const bettor = await this.memberRepository.GetByIdAsync(bet!.BettorId)
        const acceptedAnswers = answers.filter(x => x.Answer)
                                       .map(x => x.GamblerId.Value);
        await this.notifyCompletBetService.Notify({
            IsSuccessful: notification.IsSuccessful,
            GamblerIds: acceptedAnswers,
            BettorId: bettor!.MemberId.Value,
            BettorName: bettor!.Username,
            Coins: bet!.Coins
        })
    }
    GetRequestType(): string {
        return BetCompletedEventNotification.name;
    }
}

export interface INotifyBetCompleted {
    Notify(message: Message): Promise<void>
}

export interface Message {
    GamblerIds: string[];
    IsSuccessful: boolean;
    Coins: number;
    BettorId: string;
    BettorName: string;
}