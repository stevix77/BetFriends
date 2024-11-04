import { AnswerResponse, IAnswerOutputPort } from "../../../domain/features/AnswerBetHandler";
import { Presenter } from "./Presenter";

export class AnswerBetPresenter extends Presenter implements IAnswerOutputPort {
    BetIsOver(): void {
        this.subjects.get(Key.AnswerBetError.toString())?.forEach(x => x.next("Bet is over"))
    }
    Present(response: AnswerResponse): void {
        this.subjects.get(Key.Success.toString())?.forEach(x => x.next(response))
    }

}

export enum Key {
    AnswerBetError,
    Success
}