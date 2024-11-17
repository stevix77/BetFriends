import { CompleteResponse, ICompleteBetOutputPort } from '../../../domain/features/CompleteBetHandler';
import { Presenter } from "./Presenter";

export class CompleteBetPresenter extends Presenter implements ICompleteBetOutputPort {
    ProofIsRequired(): void {
        this.subjects.get(Key.CompleteError.toString())?.forEach(x => x.next("Proof is required"))
    }
    Success(response: CompleteResponse): void {
        this.subjects.get(Key.Success.toString())?.forEach(x => x.next(response))
    }
    
}

export enum Key {
    CompleteError,
    Success
}