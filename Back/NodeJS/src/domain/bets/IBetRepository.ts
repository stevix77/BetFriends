import { Bet } from "./Bet";

export interface IBetRepository {
    Add(bet: Bet): Promise<void>
}