import { IBetRepository } from '../../../src/domain/bets/IBetRepository';
import { Bet } from "../../../src/domain/bets/Bet";

export class FakeBetRepository implements IBetRepository {
    Save(bet: Bet): Promise<void> {
        this.Bets.push(bet);
        return Promise.resolve();
    }
    Bets: Bet[] = [];

}