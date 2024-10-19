import { Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { CreateBetComponent } from './bets/create-bet/create-bet.component';

export const routes: Routes = [
    {
        path: 'friends', component: FriendsComponent
    },
    {
        path: 'bets', component: CreateBetComponent,
    }
];
