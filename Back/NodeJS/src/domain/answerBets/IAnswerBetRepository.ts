import { AnswerBet } from "./AnswerBet";

export interface IAnswerBetRepository {
    Save(answerBet: AnswerBet): Promise<void>;

}