import moment from 'moment';
import { Subject } from 'rxjs';
import type { FriendDto } from '../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler';
import { CreateBetPresenter } from '../presenters/CreateBetPresenter';
import { FriendsPresenter, Key } from '../presenters/FriendsPresenter';
import type { IViewModel } from './IViewModel';
export class CreateBetViewModel implements IViewModel {
    constructor(friendsPresenter: FriendsPresenter, createBetPresenter: CreateBetPresenter) {
        const friendsSubject = new Subject<FriendDto[]>();
        friendsSubject.subscribe(x => this.Friends = x);
        friendsPresenter.Subscribe(Key.Friends, friendsSubject);

        const createBetErrorsSubject = new Subject<string>();
        createBetErrorsSubject.subscribe(x => this.Error = x)
        createBetPresenter.Subscribe(Key.CreateBetError, createBetErrorsSubject)
    }

    MaxChips: number = 1000;
    Description: string = "";
    EndDate: Date = new Date();
    Chips: number = 0;
    MinDate: string = moment().format('YYYY-MM-DD');
    Friends: FriendDto[] = [];
    FriendsSelected: string[] = [];
    Error?: string;
}