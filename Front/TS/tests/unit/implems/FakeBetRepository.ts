import { IBetRepository } from '../../../src/domain/bets/IBetRepository';
import { Bet } from "../../../src/domain/bets/Bet";
import { BetSummary } from '../../../src/domain/bets/BetSummary';

export class FakeBetRepository implements IBetRepository {
    CompleteAsync(betId: string, isSuccess: boolean, proof?: string): Promise<void> {
        this.BetsCompleted.set(betId, isSuccess)
        return Promise.resolve();
    }
    AnswerAsync(BetId: string, Answer: boolean): Promise<void> {
        return Promise.resolve();
    }
    GetAllAsync(): Promise<BetSummary[]> {
        throw new Error('Method not implemented.');
    }
    Save(bet: Bet): Promise<void> {
        this.Bets.push(bet);
        return Promise.resolve();
    }
    Bets: Bet[] = [];
    BetsCompleted: Map<string, boolean> = new Map<string, boolean>();

}