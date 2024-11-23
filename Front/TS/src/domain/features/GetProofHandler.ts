import { IBetRepository } from '../bets/IBetRepository';
export class GetProofHandler {
    constructor(private readonly betRepository: IBetRepository) {}
    Handle(request: IGetProofRequest): Promise<string> {
        return this.betRepository.GetProofAsync(request.BetId);
    }
}

export interface IGetProofRequest {
    BetId: string;
}