import { BetId } from "../bets/BetId";
import { AnswerBet } from "./AnswerBet";

export interface IAnswerBetRepository {
    GetAnswersForBet(BetId: BetId): Promise<AnswerBet[]>;
    Save(answerBet: AnswerBet): Promise<void>;

}