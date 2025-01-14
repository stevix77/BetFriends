import moment from 'moment';
import { Subject } from 'rxjs';
import type { FriendDto } from '../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler';
import { CreateBetPresenter, Key as KeyCreateBetPresenter } from '../../../../adapters/presenters/CreateBetPresenter';
import { FriendsPresenter, Key as KeyFriendsPresenter} from '../../../../adapters/presenters/FriendsPresenter';
import type { IViewModel } from './IViewModel';
import type { FriendsController } from '../../../../adapters/controllers/FriendsController';
import type { BetsController } from '../../../../adapters/controllers/BetsController';
import type { CreateBetResponse } from '../../../../../domain/features/CreateBetHandler';
import type { Router } from 'vue-router';
import type { AuthService } from '../services/authService';
export class CreateBetViewModel implements IViewModel {
    constructor(friendsPresenter: FriendsPresenter, 
                private createBetPresenter: CreateBetPresenter, 
                private friendsController: FriendsController,
                private betsController: BetsController,
                private router: Router,
                authService: AuthService) {
        const friendsSubject = new Subject<FriendDto[]>();
        friendsSubject.subscribe(x => this.Friends = x);
        friendsPresenter.Subscribe(KeyFriendsPresenter.Friends.toString(), friendsSubject);

        const createBetErrorsSubject = new Subject<string>();
        createBetErrorsSubject.subscribe(x => this.Error = x)
        createBetPresenter.Subscribe(KeyCreateBetPresenter.CreateBetError.toString(), createBetErrorsSubject)

        this.SubscribeToCreateBetSuccess();
        authService.memberInfo$.subscribe(member => {
            if(member != undefined) {
                this.MaxCoins = member.coins;
            }
        })
    }
    

    MaxCoins: number = 0;
    Description: string = "";
    EndDate: Date = new Date();
    Coins: number = 0;
    MinDate: string = moment().format('YYYY-MM-DD');
    Friends: FriendDto[] = [];
    FriendsSelected: string[] = [];
    Error?: string;

    GetFriends(): Promise<void> {
        return this.friendsController.GetFriends();
    }

    CreateBet(): Promise<void> {
        return this.betsController.Create({
            Coins: this.Coins,
            Description: this.Description,
            EndDate: this.EndDate,
            Friends: this.FriendsSelected
        })
    }

    SubscribeToCreateBetSuccess() {
        const createBetSubject = new Subject<CreateBetResponse>();
        createBetSubject.subscribe(createBetResponse => {
            this.MaxCoins -= createBetResponse.Coins;
            this.Reset()
            this.router.push('/')
        })
        this.createBetPresenter.Subscribe(KeyCreateBetPresenter.Success.toString(), createBetSubject)
    }

    private Reset() {
        this.Description = "";
        this.EndDate = new Date(this.MinDate);
        this.Coins = 0;
        this.Friends = [];
        this.FriendsSelected = [];
        this.Error = undefined;
    }
}