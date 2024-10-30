import { Bet } from '../../../domain/bets/Bet';
import { BetSummary } from '../../../domain/bets/BetSummary';
import { IBetRepository } from '../../../domain/bets/IBetRepository';
export class InMemoryBetRepository implements IBetRepository {
    constructor(private bets: Bet[] = []){}
    getAllAsync(): PromiseLike<BetSummary[]> {
        const bets = this.bets.map(x => new BetSummary(x.Id, x.Description, x.Chips, x.EndDate, "", x.Id.substring(0, 6)));
        return Promise.resolve(bets)
    }

    Save(bet: Bet): Promise<void> {
        this.bets.push(bet);
        return Promise.resolve();
    }

}