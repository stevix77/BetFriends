import { Bet } from "../../domain/bets/Bet";
import { BetId } from "../../domain/bets/BetId";
import { IBetRepository } from "../../domain/bets/IBetRepository";

export class InMemoryBetRepository implements IBetRepository {
    constructor(public Bets: Bet[] = []){}
    GetById(betId: BetId): Promise<Bet|undefined> {
        const bet = this.Bets.find(x => x.BetId.Value == betId.Value);
        return Promise.resolve(bet);
    }

    Save(bet: Bet): Promise<void> {
        if(!this.Bets.some(b => b.BetId == bet.BetId)) {
            this.Bets.push(bet);
        }
        return Promise.resolve();
    }
}