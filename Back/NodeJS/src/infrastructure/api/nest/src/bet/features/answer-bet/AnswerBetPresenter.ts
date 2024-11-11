import { Presenter } from "src/Presenter";
import { AnswerResponse, IAnswerBetOutputPort } from "../../../../../../../application/features/answer-bet/AnswerBetHandler";

export class AnswerBetPresenter extends Presenter implements IAnswerBetOutputPort {
    
    BuildResponse(res: FastifyReply) {
        res.code(this.response.code).send(this.response.body)
    }
    DateToAnswerIsOver(): void {
        throw new Error("Method not implemented.");
    }
    MemberHasNotEnoughCoins(): void {
        throw new Error("Method not implemented.");
    }
    MemberDoesNotExisting(): void {
        throw new Error("Method not implemented.");
    }
    UserCannotAnswerOnThisBet(): void {
        throw new Error("Method not implemented.");
    }
    BetDoesNotExist(BetId: string): void {
        throw new Error("Method not implemented.");
    }
    UserCannotAnswerToOwnBet(): void {
        throw new Error("Method not implemented.");
    }
    Present(answerResponse: AnswerResponse): void {
        this.response = { code: HttpStatus.OK, body: { } }
    }

}