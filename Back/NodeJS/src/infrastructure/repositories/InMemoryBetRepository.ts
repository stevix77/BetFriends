import { Bet } from "../../domain/bets/Bet";
import { BetId } from "../../domain/bets/BetId";
import { IBetRepository } from "../../domain/bets/IBetRepository";

export class InMemoryBetRepository implements IBetRepository {
    constructor(public Bets: Bet[] = []){}
    GetById(betId: BetId): Promise<Bet|undefined> {
        const bet = this.Bets.find(x => x.BetId.Value == betId.Value);
        return Promise.resolve(bet);
    }

    Add(bet: Bet): Promise<void> {
        this.Bets.push(bet);
        return Promise.resolve();
    }
}