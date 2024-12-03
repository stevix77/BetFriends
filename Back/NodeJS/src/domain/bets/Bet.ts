import { BetId } from "./BetId";
import { Entity } from "../Entity";
import { MemberId } from "../members/MemberId";
import { BetCreated } from "./events/BetCreated";
import { IDateTimeProvider } from "../IDateTimeProvider";
import { BetCompleted } from "./events/BetCompleted";

export class Bet extends Entity {
    
    
    IsSuccessful?: boolean;



    static Create(betId: BetId, 
                    memberId: MemberId, 
                    description: string, 
                    chips: number, 
                    endDate: Date, 
                    members: string[],
                    dateTimeProvider: IDateTimeProvider,
                    isSuccessful: boolean|undefined = undefined): Bet {
            const maxAnswerEndDate = new Date(dateTimeProvider.GetDate().getTime() + ((endDate.getTime() - dateTimeProvider.GetDate().getTime()) / 2))
        return new Bet(betId, memberId, description, chips, endDate, members, maxAnswerEndDate, isSuccessful);
    }
    private constructor(public BetId: BetId, 
                        public BettorId: MemberId, 
                        public Description: string, 
                        public Coins: number, 
                        public EndDate: Date, 
                        public Members: string[],
                        public MaxAnswerDate: Date,
                    isSuccessful?: boolean){
        super();
        this.IsSuccessful = isSuccessful;
        this.AddDomainEvent(new BetCreated(BetId, BettorId, Coins))
    }

    Close(isSuccessful: boolean) {
        this.IsSuccessful = isSuccessful;
        this.AddDomainEvent(new BetCompleted(this.BetId, isSuccessful))
    }
}