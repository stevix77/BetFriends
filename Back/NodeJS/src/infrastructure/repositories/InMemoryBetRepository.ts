import { Bet } from "../../domain/bets/Bet";
import { IBetRepository } from "../../domain/bets/IBetRepository";

export class InMemoryBetRepository implements IBetRepository {
    constructor(public Bets: Bet[] = []){}

    Add(bet: Bet): Promise<void> {
        this.Bets.push(bet);
        return Promise.resolve();
    }
}