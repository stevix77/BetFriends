import { BetCompletedNotification } from "./BetCompletedNotification";
import { INotificationHandler } from "../../../../../shared/application/Request/INotificationHandler";
import { IBetRepository } from "../../../domain/bets/IBetRepository";
import { BetId } from "../../../domain/bets/BetId";
import { IMemberRepository } from "../../../domain/members/IMemberRepository";
import { IAnswerBetRepository } from "../../../domain/answerBets/IAnswerBetRepository";

export class UpdateBalanceGamblersHandler implements INotificationHandler<BetCompletedNotification> {

    constructor(private betRepository: IBetRepository,
        private memberRepository: IMemberRepository,
        private answerBetRepository: IAnswerBetRepository
) {}

    async Handle(notification: BetCompletedNotification): Promise<void> {
        const bet = await this.betRepository.GetById(new BetId(notification.BetId));
        if(!bet) {
            return Promise.reject(`bet ${notification.BetId} does not exist`);
        }

        if(bet.IsSuccessful === false) {
            const answers = await this.answerBetRepository.GetAnswersForBet(bet.BetId);
            for(let answer of answers) {
                const gambler = await this.memberRepository.GetByIdAsync(answer.GamblerId);
                gambler!.IncreaseBalance(bet.Coins + bet.Coins / answers.length)
                await this.memberRepository.Save(gambler!);
            }
        }
    }
    GetRequestType(): string {
        return BetCompletedNotification.name;
    }

}