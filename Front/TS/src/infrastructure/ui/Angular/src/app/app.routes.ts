import { Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';

export const routes: Routes = [
    {
        path: 'friends', component: FriendsComponent
    },
    {
        path: '', redirectTo: 'friends', pathMatch: 'full',
    },
    { path: '**', redirectTo: 'friends'}
];
