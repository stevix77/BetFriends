import { BetId } from "./BetId";
import { Entity } from "../Entity";
import { MemberId } from "../members/MemberId";
import { BetCreated } from "./events/BetCreated";

export class Bet extends Entity {
    static Create(betId: BetId, memberId: MemberId, description: string, chips: number, endDate: Date, members: string[]): Bet {
        return new Bet(betId, memberId, description, chips, endDate, members);
    }
    private constructor(public BetId: BetId, public BettorId: MemberId, public Description: string, public Coins: number, public EndDate: Date, public Members: string[]){
        super();
        this.AddDomainEvent(new BetCreated(BetId, BettorId))
    }
}