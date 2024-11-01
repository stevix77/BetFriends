import { CreateBetHandler } from '../../../domain/features/CreateBetHandler';
import { BetSummary } from '../../../domain/bets/BetSummary';
import { RetrieveBetsHandler } from '../../../domain/features/RetrieveBetsHandler';
import { RetrieveBetHandler } from '../../../domain/features/RetrieveBetHandler';
import type { BetDetail } from '../../../domain/bets/BetDetail';
export class BetsController {
    
    constructor(private readonly createBetHandler: CreateBetHandler,
                private readonly retrieveBetsHandler: RetrieveBetsHandler,
                private readonly retrieveBetHandler: RetrieveBetHandler) {}

    Create(request: CreateBetRequest): Promise<void> {
        return this.createBetHandler.Handle({
            Chips: request.Chips,
            Description: request.Description,
            EndDate: request.EndDate,
            Friends: request.Friends
        })
    }

    RetrieveById(id: string): Promise<BetDetail> {
        return this.retrieveBetHandler.Handle(id);
    }

    RetrieveBetsAsync(): Promise<BetSummary[]> {
        return this.retrieveBetsHandler.Handle();
    }
}

export type CreateBetRequest = {
    Chips: number;
    Description: string;
    EndDate: Date;
    Friends: string[];
}