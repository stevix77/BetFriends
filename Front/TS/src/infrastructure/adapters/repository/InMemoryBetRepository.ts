import { Bet } from '../../../domain/bets/Bet';
import { IBetRepository } from '../../../domain/bets/IBetRepository';
export class InMemoryBetRepository implements IBetRepository {
    constructor(private bets: Bet[] = []){}
    Save(bet: Bet): Promise<void> {
        this.bets.push(bet);
        return Promise.resolve();
    }

}