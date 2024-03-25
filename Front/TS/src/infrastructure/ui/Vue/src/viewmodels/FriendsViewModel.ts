import { type FriendDto } from "../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { type MemberDto } from '../../../../../domain/members/IMemberRepository';

export class FriendsViewModel extends EventTarget {
    constructor() {
        super()
    }
    Friends: FriendDto[] = [];
    Members: MemberDto[] = [];
    ShowFriends: boolean = true;
}