import { CreateBetHandler } from '../../../domain/features/CreateBetHandler';
import { type BetSummary } from '../../../domain/bets/BetSummary';
import { RetrieveBetsHandler } from '../../../domain/features/RetrieveBetsHandler';
import { AnswerBetHandler } from '../../../domain/features/AnswerBetHandler';
export class BetsController {
    
    constructor(private readonly createBetHandler: CreateBetHandler,
                private readonly retrieveBetsHandler: RetrieveBetsHandler,
                private readonly answerBetHandler: AnswerBetHandler) {}

    Create(request: CreateBetRequest): Promise<void> {
        return this.createBetHandler.Handle({
            Coins: request.Coins,
            Description: request.Description,
            EndDate: request.EndDate,
            Friends: request.Friends
        })
    }

    RetrieveBetsAsync(): Promise<BetSummary[]> {
        return this.retrieveBetsHandler.Handle();
    }

    AnswerAsync(betId: string, 
                answer: boolean, 
                maxAnswerDate: Date, 
                bookieId: string,
                oldAnswer?: boolean): Promise<void> {
        return this.answerBetHandler.Handle({
            BetId: betId,
            Answer: answer,
            MaxAnswerDate: maxAnswerDate,
            BookieId: bookieId,
            OldAnswer: oldAnswer
        })
    }
}

export type CreateBetRequest = {
    Coins: number;
    Description: string;
    EndDate: Date;
    Friends: string[];
}