import { type IBetRepository } from '../bets/IBetRepository';

export class AnswerBetHandler {
    constructor(private readonly betRepository: IBetRepository){}

    async Handle(request: IAnswerRequest): Promise<void> {
        console.log(request)
        // const response = this.betRepository.AnswerAsync(request.BetId, request.Answer);
    }
}

export interface IAnswerRequest {
    BetId: string;
    Answer: boolean;
    BookieId: string;
    EndDate: Date;
}