import { AnswerResponse, IAnswerOutputPort } from "../../../src/domain/features/AnswerBetHandler";

export class FakeAnswerBetPresenter implements IAnswerOutputPort {
    
    Error: string;
    AnswerResponse: AnswerResponse;

    SameAnswer(response: AnswerResponse): void {
        this.Error = `already answer ${response.Answer} for bet ${response.BetId}`;
    }
    BetIsOver(): void {
        this.Error = "Bet is over"
    }

    OwnBet(): void {
        this.Error = "cannot answer to a own bet";
    }
    
    Present(response: AnswerResponse): void {
        this.AnswerResponse = response;
    }

}