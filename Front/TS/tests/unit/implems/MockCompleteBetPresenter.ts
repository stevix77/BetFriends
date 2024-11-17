import { CompleteResponse, type ICompleteBetOutputPort } from "../../../src/domain/features/CompleteBetHandler";

export class MockCompleteBetPresenter implements ICompleteBetOutputPort {
    
    ProofIsRequired(): void {
        this.IsCompleted = false;
        this.ErrorMessage = "proof is required"
    }
    Success(response: CompleteResponse): void {
        this.IsCompleted = true;
    }
    IsCompleted: boolean;
    ErrorMessage?: string;
}