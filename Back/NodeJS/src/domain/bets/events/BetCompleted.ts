import { IDomainEvent } from "../../IDomainEvent";
import { BetId } from "../BetId";

export class BetCompleted implements IDomainEvent {
    constructor(public BetId: BetId, public IsSuccessful: boolean){}
}