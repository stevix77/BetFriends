import { AnswerResponse, IAnswerOutputPort } from "../../../src/domain/features/AnswerBetHandler";

export class FakeAnswerBetPresenter implements IAnswerOutputPort {
    BetIsOver(): void {
        this.Error = "Bet is over"
    }
    Error: string;
    AnswerResponse: AnswerResponse;

    Present(response: AnswerResponse): void {
        this.AnswerResponse = response;
    }

}