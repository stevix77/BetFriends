import { AnswerResponse, IAnswerOutputPort } from "../../../domain/features/AnswerBetHandler";
import { Presenter } from "./Presenter";

export class AnswerBetPresenter extends Presenter implements IAnswerOutputPort {

    OwnBet(): void {
        this.subjects.get(Key.ErrorOwnBet.toString())?.forEach(x => x.next(undefined))
    }
    SameAnswer(response: AnswerResponse): void {
        this.subjects.get(Key.ErrorSameAnswer.toString())?.forEach(x => x.next(response))
    }
    BetIsOver(): void {
        this.subjects.get(Key.AnswerBetError.toString())?.forEach(x => x.next(undefined))
    }
    Present(response: AnswerResponse): void {
        this.subjects.get(Key.Success.toString())?.forEach(x => x.next(response))
    }

}

export enum Key {
    AnswerBetError,
    Success,
    ErrorSameAnswer,
    ErrorOwnBet
}