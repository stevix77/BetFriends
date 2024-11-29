import { BetId } from "../../../domain/bets/BetId";
import { IBetRepository } from "../../../domain/bets/IBetRepository";
import { IUserContext } from "../../Abstractions/IUserContext";
import { ICommand } from "../../Abstractions/Request/ICommand";

export class CompleteBetCommandHandler {
    
    constructor(private betRepository: IBetRepository, 
                private outputPort: ICompleteBetOutputPort,
                private userContext: IUserContext) {}

    async Handle(request: CompleteBetCommand): Promise<void> {
        const bet = await this.betRepository.GetById(new BetId(request.BetId));
        if(bet == undefined) {
            this.outputPort.BetDoesNotExist(request.BetId);
            return;
        }

        if(request.IsSuccessful && request.Proof == undefined) {
            this.outputPort.SuccessfulBetNeedsProof();
            return;
        }

        if(this.userContext.UserId != bet.BettorId.Value) {
            this.outputPort.UnAuthorized(this.userContext.UserId)
            return;
        }

        bet.Close(request.IsSuccessful);
        await this.betRepository.Save(bet);
        this.outputPort.Present(new CompleteBetResponse(request.BetId, request.IsSuccessful));
        return Promise.resolve();
    }
}

export class CompleteBetCommand implements ICommand {
    
    constructor(public BetId: string, public IsSuccessful: boolean, public Proof?: string){}
    Name: string = CompleteBetCommand.name;
}

export interface ICompleteBetOutputPort {
    UnAuthorized(userId: string): void;
    SuccessfulBetNeedsProof(): void;
    BetDoesNotExist(betId: string): void;
    Present(response: CompleteBetResponse): void;

}

export class CompleteBetResponse {
    constructor(public BetId: string, public IsSuccessful: boolean) {}
}