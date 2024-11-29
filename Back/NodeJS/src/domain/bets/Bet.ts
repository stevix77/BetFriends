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
                    dateTimeProvider: IDateTimeProvider): Bet {
            const maxAnswerEndDate = new Date(dateTimeProvider.GetDate().getTime() + ((endDate.getTime() - dateTimeProvider.GetDate().getTime()) / 2))
        return new Bet(betId, memberId, description, chips, endDate, members, maxAnswerEndDate);
    }
    private constructor(public BetId: BetId, 
                        public BettorId: MemberId, 
                        public Description: string, 
                        public Coins: number, 
                        public EndDate: Date, 
                        public Members: string[],
                        public MaxAnswerDate: Date){
        super();
        this.AddDomainEvent(new BetCreated(BetId, BettorId))
    }

    Close(isSuccessful: boolean) {
        this.IsSuccessful = isSuccessful;
        this.AddDomainEvent(new BetCompleted(this.BetId, isSuccessful))
    }
}