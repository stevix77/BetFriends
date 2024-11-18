import type { Router } from "vue-router";
import type { BetsController } from "../../../../adapters/controllers/BetsController";
import { Subject } from "rxjs";
import type { CompleteResponse } from "../../../../../domain/features/CompleteBetHandler";
import { Key, type CompleteBetPresenter } from '../../../../adapters/presenters/CompleteBetPresenter'

export class CompleteBetViewModel {
    constructor(private readonly betController: BetsController, 
                private readonly router: Router,
            completeBetPresenter: CompleteBetPresenter) {
        const completeSubject = new Subject<CompleteResponse>();
        completeSubject.subscribe(x => this.router.push('/'));
        completeBetPresenter.Subscribe(Key.Success.toString(), completeSubject)
        
        const completeErrorSubject = new Subject<string>();
        completeErrorSubject.subscribe(x => this.error = x);
        completeBetPresenter.Subscribe(Key.CompleteError.toString(), completeErrorSubject)
    }
    result: string = "false";
    proof?: any;
    error?: string;

    Complete(betId: string): Promise<void> {
        const isSuccess = this.result === "false"? false : true
        return this.betController.CompleteAsync(betId, 
                                                isSuccess, 
                                                isSuccess ? this.proof : undefined)
    }
}