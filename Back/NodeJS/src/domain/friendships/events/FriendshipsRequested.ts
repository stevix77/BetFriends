import { IDomainEvent } from "../../IDomainEvent";

export class FriendshipsRequested implements IDomainEvent {
    constructor(public RequesterId: string, public FriendId: string){}
}