import { IDateTimeProvider } from "../../../domain/IDateTimeProvider"
import { IBetRepository } from "../../../domain/bets/IBetRepository"
import { IMemberRepository } from "../../../domain/members/IMemberRepository"
import { MemberId } from "../../../domain/members/MemberId"
import { IUserContext } from "../../Abstractions/IUserContext"
import { ICommand } from "../../Abstractions/Request/ICommand"
import { IRequestHandler } from "../../Abstractions/Request/IRequestHandler"

export class CreateBetCommandHandler implements IRequestHandler<CreateBetCommand, void> {
    constructor(private betRepository: IBetRepository, 
                private outputPort: ICreateBetOutputPort,
                private memberRepository: IMemberRepository,
                private userContext: IUserContext,
                private dateTimeProvider: IDateTimeProvider){}
    GetRequestType(): string {
        return CreateBetCommand.name
    }
    
    async Handle(request: CreateBetCommand): Promise<void> {
        const member = await this.memberRepository.GetByIdAsync(new MemberId(this.userContext.UserId));
        if(member == undefined) {
            this.outputPort.RequesterIsUnknown();
            return;
        }

        if(!this.IsValidRequest(request)){
            return;
        }
        
        const bet = member.Bet(request.BetId, 
                                request.Description, 
                                request.Coins, 
                                request.EndDate, 
                                request.Members,
                                this.dateTimeProvider)
        await this.betRepository.Save(bet);
        this.outputPort.Present(new CreateBetResponse(request.BetId))
    }

    private IsValidRequest(request: CreateBetCommand): boolean {
        if(this.dateTimeProvider.GetDate() > request.EndDate) {
            this.outputPort.EndDateIsTooOld();
            return false;
        }

        if(request.Coins == 0) {
            this.outputPort.InvalidChips();
            return false;
        }
        
        return true;
    }
}

export class CreateBetCommand implements ICommand {
    constructor(public BetId: string, public Description: string, public Coins: number, public EndDate: Date, public Members: Array<string>){}
    Name: string = CreateBetCommand.name;
}

export class CreateBetResponse {
    constructor(public BetId: string) {}
}

export interface ICreateBetOutputPort {
    InvalidChips(): void;
    EndDateIsTooOld(): void;
    RequesterIsUnknown(): void;
    Present(createBetResponse: CreateBetResponse): void;
}