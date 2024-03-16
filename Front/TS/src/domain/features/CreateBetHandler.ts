import { Bet } from "../bets/Bet";
import { IBetRepository } from "../bets/IBetRepository";
import { IIdGenerator } from '../abstractions/IIdGenerator';
import { IDateTimeProvider } from "../abstractions/IDateTimeProvider";

export class CreateBetHandler {
    constructor(private betRepository: IBetRepository, 
                private outputPort: ICreateBetOutputPort,
                private idGenerator: IIdGenerator,
                private dateTimeProvider: IDateTimeProvider) {}
    async Handle(request: ICreateBetRequest): Promise<void> {
        if(this.dateTimeProvider.GetDate() > request.EndDate) {
            this.outputPort.InvalidEndDate();
            return;
        }
        if(request.Description === "") {
            this.outputPort.DescriptionIsEmpty();
            return;
        }

        if(request.Friends.length == 0) {
            this.outputPort.FriendsIsEmpty();
            return;
        }

        if(request.Chips == 0) {
            this.outputPort.InvalidChip()
            return;
        }
        const bet = new Bet(this.idGenerator.Generate(), request.Description, request.EndDate, request.Chips, request.Friends);
        await this.betRepository.Save(bet);
        this.outputPort.Present(new CreateBetResponse(bet.Id, bet.Description, bet.EndDate, bet.Chips, bet.Friends))
    }
}

export interface ICreateBetRequest {
    Description: string;
    EndDate: Date;
    Chips: number;
    Friends: string[];
}

export interface ICreateBetOutputPort {
    InvalidChip(): void;
    FriendsIsEmpty(): void;
    DescriptionIsEmpty(): void;
    InvalidEndDate(): void;
    Present(createBetResponse: CreateBetResponse): void;
}

export class CreateBetResponse {
    constructor(public Id: string, 
                public Description: string, 
                public EndDate: Date, 
                public Chips: number, 
                public Friends: string[]){}
}