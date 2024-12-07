import { BetId } from "../bets/BetId";
import { Entity } from "../Entity";
import { MemberId } from "../members/MemberId";
import { BetAnswered } from "./events/BetAnswered";

export class AnswerBet extends Entity {
    constructor(public readonly BetId: BetId, 
                public readonly Answer: boolean,
                public readonly GamblerId: MemberId) {
        super()
        this.AddDomainEvent(new BetAnswered(this.BetId, this.GamblerId, this.Answer))
    }
}