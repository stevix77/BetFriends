import { BetId } from "../bets/BetId";
import { Entity } from "../Entity";
import { MemberId } from "../members/MemberId";

export class AnswerBet extends Entity {
    constructor(public readonly BetId: BetId, 
                public readonly Answer: boolean,
                public readonly GamberId: MemberId) {
        super()
    }
}