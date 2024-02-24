import { FriendDto, RetrieveFriendsHandler } from "../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { RetrieveMembersHandler } from "../../../domain/features/retrieveMembers/RetrieveMembersHandler";
import { MemberDto } from '../../../domain/members/IMemberRepository';
import { AddFriendHandler } from '../../../domain/features/add-friend/AddFriendHandler';
import { AddFriendPresenter, FriendAdded } from "../AddFriendPresenter";
import { Observer } from 'rxjs';

export class FriendsViewModel {
    public ShowFriends: boolean = true;
    Friends: FriendDto[] = [];
    Members: MemberDto[] = [];

    constructor(private retrieveFriendsHandler: RetrieveFriendsHandler,
                private retrieveMembersHandler: RetrieveMembersHandler,
                private addFriendHandler: AddFriendHandler,
                private addFriendPresenter: AddFriendPresenter) { 
                    this.addFriendPresenter.Subscribe(this.observer)
    }

  async LoadFriendsAsync(): Promise<void> {
    this.ShowFriends = true;
    this.Friends = await this.retrieveFriendsHandler.Handle();
  }

   async Search(event: string): Promise<void> {
    if(event.length >= 3) {
      this.ShowFriends = false;
      this.Members = (await this.retrieveMembersHandler.Handle(event)).sort((a, b) => (a.IsFriend ? 0 : 1) - (b.IsFriend ? 0 : 1));
      return;
    }

    this.ShowFriends = true;
  }

  async AddFriend(memberId: string) : Promise<void> {
    await this.addFriendHandler.Handle({MemberId: memberId});
  }
  
  AddToFriend(friend: FriendAdded): void {
    const member = this.Members.find(x => x.Id == friend.MemberId)
    if(member != undefined) {
        this.Friends.push({Id: member.Id, Name: member.Name})
        member.IsFriend = true;
    }
  }

  private observer: Observer<FriendAdded> = {
    next: x => this.AddToFriend(x),
    error: err => console.error(err),
    complete: () => console.log()
  }

}