import { BetCompletedNotification } from "../../../infrastructure/handlers/notifications/betCompleted/BetCompletedNotification";
import { INotificationHandler } from "../../Abstractions/Request/INotificationHandler";
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
                const gambler = await this.memberRepository.GetByIdAsync(answer.GamberId);
                gambler?.IncreaseBalance(bet.Coins / answers.length)
                await this.memberRepository.Save(gambler!);
            }
        }
    }
    GetRequestType(): string {
        return BetCompletedNotification.name;
    }

}