import { IDateTimeProvider } from '../abstractions/IDateTimeProvider';
import { type IBetRepository } from '../bets/IBetRepository';
import { type IUserContext } from '../abstractions/IUserContext';

export class AnswerBetHandler {
    constructor(private readonly betRepository: IBetRepository,
                private readonly dateTimeProvider: IDateTimeProvider,
                private readonly outputPort: IAnswerOutputPort,
                private readonly userContext: IUserContext
    ){}

    async Handle(request: IAnswerRequest): Promise<void> {
        if(this.dateTimeProvider.GetDate() > request.MaxAnswerDate) {
            this.outputPort.BetIsOver();
            return;
        }

        if(request.Answer == request.OldAnswer) {
            this.outputPort.SameAnswer({
                BetId: request.BetId,
                Answer: request.Answer
            })
            return;
        }

        if(request.BookieId == this.userContext.UserId) {
            this.outputPort.OwnBet();
            return;
        }
        await this.betRepository.AnswerAsync(request.BetId, request.Answer);
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
    MaxAnswerDate: Date;
    OldAnswer?: boolean;
}

export interface IAnswerOutputPort {
    OwnBet(): unknown;
    SameAnswer(response: AnswerResponse): void;
    BetIsOver(): void;
    Present(response: AnswerResponse): void;

}

export interface AnswerResponse {
    BetId: string;
    Answer: boolean;
}