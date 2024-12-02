import { IDomainEvent } from "../../IDomainEvent";
import { MemberId } from "../../members/MemberId";
import { BetId } from "../BetId";

export class BetCreated implements IDomainEvent {
    constructor(public BetId: BetId, public MemberId: MemberId){}
    Type: string = BetCreated.name;
}