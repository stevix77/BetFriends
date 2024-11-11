import { Bet } from "./Bet";
import { BetId } from "./BetId";

export interface IBetRepository {
    GetById(betId: BetId): Promise<Bet|undefined>;
    Add(bet: Bet): Promise<void>
}