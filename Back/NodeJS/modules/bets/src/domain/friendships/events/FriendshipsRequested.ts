import { IDomainEvent } from "../../../../../shared/domain/IDomainEvent";

export class FriendshipsRequested implements IDomainEvent {
    constructor(public RequesterId: string, public FriendId: string){}
    Type: string = FriendshipsRequested.name;
}