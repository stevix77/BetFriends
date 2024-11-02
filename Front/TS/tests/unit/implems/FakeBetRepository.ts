import { IBetRepository } from '../../../src/domain/bets/IBetRepository';
import { Bet } from "../../../src/domain/bets/Bet";
import { BetSummary } from '../../../src/domain/bets/BetSummary';

export class FakeBetRepository implements IBetRepository {
    AnswerAsync(BetId: string, Answer: boolean): Promise<void> {
        return Promise.resolve();
    }
    getAllAsync(): Promise<BetSummary[]> {
        throw new Error('Method not implemented.');
    }
    Save(bet: Bet): Promise<void> {
        this.Bets.push(bet);
        return Promise.resolve();
    }
    Bets: Bet[] = [];

}