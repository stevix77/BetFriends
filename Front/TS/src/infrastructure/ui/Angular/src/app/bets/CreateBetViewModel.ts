import moment from 'moment';
import { Subject } from 'rxjs';
import type { FriendDto } from '../../../../../../domain/features/RetrieveFriendsHandler';
import { CreateBetPresenter, Key as KeyCreateBetPresenter } from '../../../../../adapters/presenters/CreateBetPresenter';
import { FriendsPresenter, Key as KeyFriendsPresenter} from '../../../../../adapters/presenters/FriendsPresenter';
import type { FriendsController } from '../../../../../adapters/controllers/FriendsController';
import type { BetsController } from '../../../../../adapters/controllers/BetsController';
import type { CreateBetResponse } from '../../../../../../domain/features/CreateBetHandler';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
export class CreateBetViewModel {
    constructor(friendsPresenter: FriendsPresenter, 
                private createBetPresenter: CreateBetPresenter, 
                private friendsController: FriendsController,
                private betsController: BetsController,
                private router: Router,
                authService: AuthService) {
        const friendsSubject = new Subject<FriendDto[]>();
        friendsSubject.subscribe(friends => {
            this.Friends = friends.map<MemberSelected>((x) => {
                return {
                    MemberId: x.Id,
                    MemberName: x.Name,
                    IsSelected: false,
                }
            })
        });
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
    Friends: MemberSelected[] = [];
    Error?: string;

    GetFriends(): Promise<void> {
        return this.friendsController.GetFriends();
    }

    CreateBet(): Promise<void> {
        this.Error = undefined;
        return this.betsController.Create({
            Coins: this.Coins,
            Description: this.Description,
            EndDate: new Date(this.EndDate),
            Friends: this.Friends.filter(x => x.IsSelected).map(x => x.MemberId)
        })
    }

    SubscribeToCreateBetSuccess() {
        const createBetSubject = new Subject<CreateBetResponse>();
        createBetSubject.subscribe(x => {
            this.MaxCoins -= this.Coins;
            this.Reset();
            this.router.navigate(['/'])
        })
        this.createBetPresenter.Subscribe(KeyCreateBetPresenter.Success.toString(), createBetSubject)
    }

    private Reset() {
        this.Description = "";
        this.Coins = 0;
        this.Error = "";
        this.EndDate = new Date(this.MinDate);
        this.Friends = [];
    }
}

class MemberSelected {
    MemberId: string = "";
    MemberName: string = "";
    IsSelected: boolean = false;
}