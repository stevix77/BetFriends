import { Bet } from "./Bet";
import { BetSummary } from "./BetSummary";
import { type BetDetail } from "./BetDetail";

export interface IBetRepository {
    getById(id: string): Promise<BetDetail>;
    getAllAsync(): PromiseLike<BetSummary[]>;
    Save(bet: Bet) : Promise<void>;
}