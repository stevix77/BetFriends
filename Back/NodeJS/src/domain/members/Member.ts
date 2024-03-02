import { MemberId } from './MemberId'
import { Friendship } from '../friendships/Friendship';

export class Member {
    constructor(public MemberId: MemberId){}

    AddFriendship(requesterId: string) {
        return Friendship.Create(new MemberId(requesterId), this.MemberId);
    }
}