import { Bet } from "./Bet";
import { BetSummary } from "./BetSummary";

export interface IBetRepository {
    getAllAsync(): PromiseLike<BetSummary[]>;
    Save(bet: Bet) : Promise<void>;
}