import { BetDetail } from '../bets/BetDetail';
import { type IBetRepository } from '../bets/IBetRepository';

export class RetrieveBetHandler {
    constructor(private readonly betRepository: IBetRepository){}

    Handle(id: string): Promise<BetDetail> {
        return this.betRepository.getById(id);
    }
}