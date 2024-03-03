import { Entity } from "../Entity";
import { MemberId } from "../members/MemberId";
import { FriendshipsRequested } from './events/FriendshipsRequested';

export class Friendship extends Entity {

    private constructor(requesterId: MemberId, memberId: MemberId){
        super()
        this.FriendId = memberId;
        this.RequesterId = requesterId;
        this.AddDomainEvent(new FriendshipsRequested(requesterId.Value, memberId.Value));
    }

    static Create(requesterId: MemberId, memberId: MemberId) {
        return new Friendship(requesterId, memberId);
    }
    public FriendId: MemberId;
    public RequesterId: MemberId;
}