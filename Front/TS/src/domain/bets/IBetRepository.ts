import { Bet } from "./Bet";
import { BetSummary } from "./BetSummary";

export interface IBetRepository {
    CompleteAsync(betId: string, isSuccess: boolean, proof?: string): Promise<void>;
    AnswerAsync(BetId: string, Answer: boolean): Promise<void>;
    GetAllAsync(): Promise<BetSummary[]>;
    Save(bet: Bet) : Promise<void>;
}