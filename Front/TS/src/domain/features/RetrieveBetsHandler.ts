import { IBetRepository } from '../bets/IBetRepository';
import { BetSummary } from '../bets/BetSummary';
export class RetrieveBetsHandler {
    constructor(private readonly betRepository: IBetRepository) {}

    async Handle(): Promise<BetSummary[]> {
        return this.betRepository.getAllAsync();
    }
}