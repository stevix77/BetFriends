import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { CompleteResponse } from "../../../../../../domain/features/CompleteBetHandler";
import { BetsController } from "../../../../../adapters/controllers/BetsController";
import { CompleteBetPresenter, Key } from "../../../../../adapters/presenters/CompleteBetPresenter";

export class CompleteBetViewModel {
    constructor(private readonly betController: BetsController, 
                private readonly router: Router,
                completeBetPresenter: CompleteBetPresenter) {
        const completeSubject = new Subject<CompleteResponse>();
        completeSubject.subscribe(x => {
            this.Reset();
            this.router.navigate(['/'])
        });
        completeBetPresenter.Subscribe(Key.Success.toString(), completeSubject)

        const completeErrorSubject = new Subject<string>();
        completeErrorSubject.subscribe(x => this.error = x);
        completeBetPresenter.Subscribe(Key.CompleteError.toString(), completeErrorSubject)
    }

    result?: boolean;
    proof?: any;
    error?: string;

    Complete(betId: string): Promise<void> {
        return this.betController.CompleteAsync(betId, 
                                                this.result!.valueOf(), 
                                                this.result!.valueOf() ? this.proof : undefined)
    }

    Reset() {
        this.proof = undefined;
        this.error = undefined;
        this.result = undefined;
    }
}