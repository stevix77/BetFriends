import { ICompleteBetOutputPort, CompleteBetResponse } from "../../../src/application/features/complete-bet/CompleteBetHandler";

export class MockCompleteBetPresenter implements ICompleteBetOutputPort {
    UnAuthorized(userId: string): void {
        this.Response = `${userId} is not authorized`;
    }
    SuccessfulBetNeedsProof(): void {
        this.Response = 'command has no proof';
    }
    BetDoesNotExist(betId: string): void {
        this.Response = `bet ${betId} does not exist`;
    }
    Present(response: CompleteBetResponse): void {
        this.Response = response;
    }
    Response: any;
}