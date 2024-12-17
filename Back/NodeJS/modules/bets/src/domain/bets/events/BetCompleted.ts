import { IDomainEvent } from "../../../../../shared/domain/IDomainEvent";
import { BetId } from "../BetId";

export class BetCompleted implements IDomainEvent {
    constructor(public BetId: BetId, public IsSuccessful: boolean){}
    Type: string = BetCompleted.name;
}