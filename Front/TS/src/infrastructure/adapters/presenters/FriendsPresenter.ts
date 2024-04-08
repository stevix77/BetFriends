import type { IAddFriendOutputPort } from "../../../domain/features/add-friend/AddFriendHandler";
import type { FriendDto, IRetrieveFriendsOutputPort } from "../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import type { IRetrieveMembersOutputPort } from "../../../domain/features/retrieveMembers/RetrieveMembersHandler";
import type { MemberDto } from "../../../domain/members/IMemberRepository";
import { Presenter } from "./Presenter";

export class FriendsPresenter extends Presenter implements IRetrieveFriendsOutputPort, IAddFriendOutputPort, IRetrieveMembersOutputPort {
  constructor(){
    super()
  }
  PresentFriends(friends: FriendDto[]): void {
    this.subjects.get(Key.Friends.toString())?.forEach(x => x.next(friends));
  }
  PresentMemberAdded(memberId: string): void {
    this.subjects.get(Key.FriendAdded.toString())?.forEach(x => x.next(memberId))
  }
  PresentMembers(members: MemberDto[]): void {
    this.subjects.get(Key.Members.toString())?.forEach(x => x.next(members));
  }
  NotEnoughCharacter(): void {
    this.subjects.get(Key.Members.toString())?.forEach(x => x.next(undefined));
  }
}


export enum Key {
  Friends,
  Members,
  FriendAdded
}