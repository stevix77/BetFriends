import type { FriendDto, IRetrieveFriendsOutputPort } from "../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { Subject } from 'rxjs'

export class RetrieveFriendsPresenter extends EventTarget implements IRetrieveFriendsOutputPort  {
  
  constructor(){ 
    super()
  }

  Present(friends: FriendDto[]): void {
    this.subjects.forEach(x => x.next(friends));
  }
  
  Subscribe(subject: Subject<FriendDto[]>) {
    this.subjects.push(subject);
  }

  subjects: Subject<FriendDto[]>[] = [];

}