import type { IViewModel } from "./IViewModel";
import { Subject } from 'rxjs';
import { FriendsPresenter, Key } from '../../../../adapters/presenters/FriendsPresenter';
import type { FriendDto } from '../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler';
import type { MemberDto } from '../../../../../domain/members/IMemberRepository';
import type { FriendsController } from "../../../../adapters/controllers/FriendsController";

export class FriendsViewModel implements IViewModel {
    constructor(friendsPresenter: FriendsPresenter, 
                private friendsController: FriendsController) {
        this.SubscribeToFriendsResponse(friendsPresenter);
        this.SubscribeToMembersResponse(friendsPresenter);
    }

    SubscribeToMembersResponse(friendsPresenter: FriendsPresenter) {
        const subject = new Subject<MemberDto[]>();
        subject.subscribe(members => this.MembersReceived(members));
        friendsPresenter.Subscribe(Key.Members.toString(), subject);
    }
    MembersReceived(members: MemberDto[]): void {
        this.Members = members;
        this.ShowFriends = false;
    }

    SubscribeToFriendsResponse(friendsPresenter: FriendsPresenter) {
        const friendsSubject = new Subject<FriendDto[]>();
        friendsSubject.subscribe(x => this.Friends = x);
        friendsPresenter.Subscribe(Key.Friends.toString(), friendsSubject);
    }

    ShowFriends: boolean = true;
    Friends: FriendDto[] = [];
    Members: MemberDto[] = [];

    GetFriends(): Promise<void> {
        return this.friendsController.GetFriends();
    }

    SearchMembers(keyword: string): Promise<void> {
        return this.friendsController.SearchMembers(keyword);
    }

    AddFriend(memberId: string): Promise<void> {
        return this.friendsController.AddFriend(memberId);
    }
}