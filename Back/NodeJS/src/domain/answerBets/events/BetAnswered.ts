import { BetId } from "../../bets/BetId";
import { IDomainEvent } from "../../IDomainEvent";
import { MemberId } from "../../members/MemberId";

export class BetAnswered implements IDomainEvent {
    constructor(public readonly BetId: BetId,
                public readonly GamblerId: MemberId,
                public readonly Answer: boolean
    ) {}
    Type: string = BetAnswered.name;
}