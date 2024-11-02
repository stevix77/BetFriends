import { AnswerResponse, IAnswerOutputPort } from "../../../domain/features/AnswerBetHandler";

export class AnswerBetPresenter implements IAnswerOutputPort {
    BetIsOver(): void {
        throw new Error("Method not implemented.");
    }
    Present(response: AnswerResponse): unknown {
        throw new Error("Method not implemented.");
    }

}