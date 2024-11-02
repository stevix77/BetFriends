import { IDateTimeProvider } from '../abstractions/IDateTimeProvider';
import { type IBetRepository } from '../bets/IBetRepository';

export class AnswerBetHandler {
    constructor(private readonly betRepository: IBetRepository,
                private readonly dateTimeProvider: IDateTimeProvider
    ){}

    async Handle(request: IAnswerRequest): Promise<void> {
        
        // const response = this.betRepository.AnswerAsync(request.BetId, request.Answer);
    }
}

export interface IAnswerRequest {
    BetId: string;
    Answer: boolean;
    BookieId: string;
    EndDate: Date;
}