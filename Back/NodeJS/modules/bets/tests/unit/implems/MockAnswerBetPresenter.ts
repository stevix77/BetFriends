import { AnswerResponse, IAnswerBetOutputPort } from "../../../src/application/features/answer-bet/AnswerBetHandler";

export class MockAnswerBetPresenter implements IAnswerBetOutputPort{
    
    Error: string;
    Response: AnswerResponse;

    DateToAnswerIsOver(): void {
        this.Error = "time for answer is over";
    }
    BetDoesNotExist(BetId: string): void {
        this.Error = "bet does not exist"
    }
    UserCannotAnswerOnThisBet(): void {
        this.Error = "user is not invited on this bet"
    }
    MemberDoesNotExisting(): void {
        this.Error = "user is not existing"
    }
    UserCannotAnswerToOwnBet(): void {
        this.Error = "user is the creator of bet"
    }
    MemberHasNotEnoughCoins(): void {
        this.Error = "user has not enough coins";
    }
    Present(response: AnswerResponse): void {
        this.Response = response; 
    }
}