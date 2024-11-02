import { IDateTimeProvider } from '../abstractions/IDateTimeProvider';
import { type IBetRepository } from '../bets/IBetRepository';

export class AnswerBetHandler {
    constructor(private readonly betRepository: IBetRepository,
                private readonly dateTimeProvider: IDateTimeProvider,
                private readonly outputPort: IAnswerOutputPort
    ){}

    async Handle(request: IAnswerRequest): Promise<void> {
        if(this.dateTimeProvider.GetDate() > request.EndDate) {
            this.outputPort.BetIsOver();
            return;
        }
        const response = this.betRepository.AnswerAsync(request.BetId, request.Answer);
        this.outputPort.Present({
            BetId: request.BetId,
            Answer: request.Answer
        })    
    }
}

export interface IAnswerRequest {
    BetId: string;
    Answer: boolean;
    BookieId: string;
    EndDate: Date;
}

export interface IAnswerOutputPort {
    BetIsOver(): void;
    Present(response: AnswerResponse): void;

}

export interface AnswerResponse {
    BetId: string;
    Answer: boolean;
}