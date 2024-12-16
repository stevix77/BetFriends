import { Bet } from "./Bet";
import { BetId } from "./BetId";

export interface IBetRepository {
    GetById(betId: BetId): Promise<Bet|undefined>;
    Save(bet: Bet): Promise<void>
}