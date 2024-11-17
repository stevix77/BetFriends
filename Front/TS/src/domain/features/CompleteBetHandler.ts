import { IBetRepository } from "../bets/IBetRepository";

export class CompleteBetHandler {
    Handle(request: ICompleteBetRequest): Promise<void> {
        if(this.HasNeedProof(request.isSuccess, request.proof)) {
            return Promise.resolve();
        }
        this.betRepository.CompleteAsync(request.betId, request.isSuccess, request.proof)
        this.outputPort.Success({
            BetId: request.betId,
            IsSuccess: request.isSuccess
        });
        return Promise.resolve()
    }
    
    private HasNeedProof(isSuccess: boolean, proof: string | undefined) {
        if(isSuccess && !proof) {
            this.outputPort.ProofIsRequired();
            return true;
        }
        return false; 
    }
    constructor(private readonly betRepository: IBetRepository, private readonly outputPort: ICompleteBetOutputPort) {}
}

export interface ICompleteBetRequest { 
    betId: string; 
    isSuccess: boolean; 
    proof?: string; 
}

export interface ICompleteBetOutputPort {
    ProofIsRequired(): void;
    Success(response: CompleteResponse): void;
}

export interface CompleteResponse {
    BetId: string;
    IsSuccess: boolean;
}