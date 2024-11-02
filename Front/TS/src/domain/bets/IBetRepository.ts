import { Bet } from "./Bet";
import { BetSummary } from "./BetSummary";

export interface IBetRepository {
    AnswerAsync(BetId: string, Answer: boolean): unknown;
    getAllAsync(): Promise<BetSummary[]>;
    Save(bet: Bet) : Promise<void>;
}