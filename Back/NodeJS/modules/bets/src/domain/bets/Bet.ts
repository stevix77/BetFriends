import { BetId } from "./BetId";
import { Entity } from "../../../../shared/domain/Entity";
import { MemberId } from "../members/MemberId";
import { BetCreated } from "./events/BetCreated";
import { IDateTimeProvider } from "../../../../shared/domain/IDateTimeProvider";
import { BetCompleted } from "./events/BetCompleted";

export class Bet extends Entity {
    static CreateFromEntity(betId: BetId, bettorId: MemberId, coins: number, description: string, endDate: Date, maxAnswerDate: Date, guests: string[], isSuccessful: boolean | undefined): Bet {
        return new Bet(betId, 
                        bettorId, 
                        description, 
                        coins, 
                        endDate, 
                        guests, 
                        maxAnswerDate, 
                        isSuccessful);
    }
    
    
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
            const bet = new Bet(betId, memberId, description, chips, endDate, members, maxAnswerEndDate, isSuccessful);
            bet.AddDomainEvent(new BetCreated(bet.BetId, bet.BettorId, bet.Coins))
        return bet;
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
    }

    Close(isSuccessful: boolean) {
        this.IsSuccessful = isSuccessful;
        this.AddDomainEvent(new BetCompleted(this.BetId, isSuccessful))
    }
}