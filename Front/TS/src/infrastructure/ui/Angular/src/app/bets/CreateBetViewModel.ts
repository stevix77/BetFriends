import moment from 'moment';
import { Subject } from 'rxjs';
import type { FriendDto } from '../../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler';
import { CreateBetPresenter, Key as KeyCreateBetPresenter } from '../../../../../adapters/presenters/CreateBetPresenter';
import { FriendsPresenter, Key as KeyFriendsPresenter} from '../../../../../adapters/presenters/FriendsPresenter';
import type { FriendsController } from '../../../../../adapters/controllers/FriendsController';
import type { BetsController } from '../../../../../adapters/controllers/BetsController';
import type { CreateBetResponse } from '../../../../../../domain/features/CreateBetHandler';
export class CreateBetViewModel {
    constructor(friendsPresenter: FriendsPresenter, 
                private createBetPresenter: CreateBetPresenter, 
                private friendsController: FriendsController,
                private betsController: BetsController) {
        const friendsSubject = new Subject<FriendDto[]>();
        friendsSubject.subscribe(x => this.Friends = x);
        friendsPresenter.Subscribe(KeyFriendsPresenter.Friends.toString(), friendsSubject);

        const createBetErrorsSubject = new Subject<string>();
        createBetErrorsSubject.subscribe(x => this.Error = x)
        createBetPresenter.Subscribe(KeyCreateBetPresenter.CreateBetError.toString(), createBetErrorsSubject)

        this.SubscribeToCreateBetSuccess();
    }
    

    MaxChips: number = 1000;
    Description: string = "";
    EndDate: Date = new Date();
    Chips: number = 0;
    MinDate: string = moment().format('YYYY-MM-DD');
    Friends: FriendDto[] = [];
    FriendsSelected: string[] = [];
    Error?: string;

    GetFriends(): Promise<void> {
        return this.friendsController.GetFriends();
    }

    CreateBet(): Promise<void> {
        return this.betsController.Create({
            Chips: this.Chips,
            Description: this.Description,
            EndDate: this.EndDate,
            Friends: this.FriendsSelected
        })
    }

    SubscribeToCreateBetSuccess() {
        const createBetSubject = new Subject<CreateBetResponse>();
        this.createBetPresenter.Subscribe(KeyCreateBetPresenter.Success.toString(), createBetSubject)
    }
}