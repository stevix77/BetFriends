import { IAddFriendOutputPort } from "../../domain/features/add-friend/AddFriendHandler";
import { Subject, Observer } from 'rxjs';

export class AddFriendPresenter implements IAddFriendOutputPort {
    private friendSubject = new Subject<FriendAdded>();
    Present(memberId: string): void {
        this.friendSubject.next({MemberId: memberId})
    }

    Subscribe(observer: Observer<FriendAdded>) {
        this.friendSubject.subscribe(observer)
    }
}

export interface FriendAdded {
    MemberId: string;
}