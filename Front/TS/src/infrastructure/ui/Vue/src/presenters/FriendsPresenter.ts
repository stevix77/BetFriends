import type { IAddFriendOutputPort } from "../../../../../domain/features/add-friend/AddFriendHandler";
import type { FriendDto, IRetrieveFriendsOutputPort } from "../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import type { IRetrieveMembersOutputPort } from "../../../../../domain/features/retrieveMembers/RetrieveMembersHandler";
import type { MemberDto } from "../../../../../domain/members/IMemberRepository";
import { Subject } from 'rxjs';

export class FriendsPresenter implements IRetrieveFriendsOutputPort, IAddFriendOutputPort, IRetrieveMembersOutputPort {
  constructor(){}
  PresentFriends(friends: FriendDto[]): void {
    // this.vm.Friends = friends;
    // this.subjects.forEach(x => x.next(friends));
    this.subjects.get(Key.Friends)?.forEach(x => x.next(friends));
  }
  PresentMemberAdded(memberId: string): void {
    // const member = (this.vm.Members as MemberDto[]).find(x => x .Id == memberId)
    //     if(member) {
    //         member.IsFriend = true;
    //         this.vm.Friends.push({
    //             Id: member.Id,
    //             Name: member.Name
    //         });
    //     }
  }
  PresentMembers(members: MemberDto[]): void {
    // this.vm.Members = members;
    // this.vm.ShowFriends = false;
  }
  NotEnoughCharacter(): void {
    // this.vm.ShowFriends = true
  }

  Subscribe<T>(key: Key, subject: Subject<T>) {
    if(this.subjects.has(key)) {
      this.subjects.get(key)?.push(subject);
      return;
    }
    this.subjects.set(key, [subject]);
  }

  private subjects: Map<Key, Subject<any>[]> = new Map();

  vm: any = {
    ShowFriends: true,
    Friends: [],
    Members: []
  }
}




export enum Key {
    Friends,
    CreateBet,
    CreateBetError
}