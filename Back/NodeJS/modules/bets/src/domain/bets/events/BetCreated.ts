import { IDomainEvent } from "../../../../../shared/domain/IDomainEvent";
import { MemberId } from "../../members/MemberId";
import { BetId } from "../BetId";

export class BetCreated implements IDomainEvent {
    constructor(public BetId: BetId, public MemberId: MemberId, public Coins: number){}
    Type: string = BetCreated.name;
}