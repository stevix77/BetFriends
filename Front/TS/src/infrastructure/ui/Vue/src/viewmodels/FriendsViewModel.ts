import type { IViewModel } from "./IViewModel";
import { Subject } from 'rxjs';
import { FriendsPresenter, Key } from '../presenters/FriendsPresenter';
import type { FriendDto } from '../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler';
import type { MemberDto } from '../../../../../domain/members/IMemberRepository';

export class FriendsViewModel implements IViewModel {
    constructor(friendsPresenter: FriendsPresenter) {
        const friendsSubject = new Subject<FriendDto[]>();
        friendsSubject.subscribe(x => this.Friends = x);
        friendsPresenter.Subscribe(Key.Friends, friendsSubject);
    }

    ShowFriends: boolean = true;
    Friends: FriendDto[] = [];
    Members: MemberDto[] = [];
}