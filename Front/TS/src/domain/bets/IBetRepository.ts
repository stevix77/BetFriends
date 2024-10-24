import { Bet } from "./Bet";

export interface IBetRepository {
    Save(bet: Bet) : Promise<void>;
}