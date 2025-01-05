import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BetsModule } from "./bets/bets.module";
import { FriendsModule } from "./friends/friends.module";
import { AppComponent } from "./app.component";
import { type IMemberRepository, MemberDto } from '../../../../../domain/members/IMemberRepository';
import { InMemoryFriendRepository } from "../../../../adapters/repository/InMemoryFriendRepository";
import { InMemoryMemberRepository } from "../../../../adapters/repository/InMemoryMemberRepository";
import { InMemoryBetRepository } from "../../../../adapters/repository/InMemoryBetRepository";
import { FriendsPresenter } from "../../../../adapters/presenters/FriendsPresenter";
import { IdGenerator } from "../../../../adapters/IdGenerator";
import { DateTimeProvider } from "../../../../adapters/DateTimeProvider";
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule } from "@angular/router";
import { UserContext } from "./services/userContext";
import { IUserContext } from "../../../../../domain/abstractions/IUserContext";
import { Bet } from "../../../../../domain/bets/Bet";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from './guards/authGuard';
import { AuthService } from './services/authService';
import { GuestGuard } from "./guards/guestGuard";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FriendsModule,
        BetsModule,
        AuthModule,
        NavbarComponent,
        RouterModule,
        HttpClientModule
    ],
    providers:[
        AuthGuard,
        GuestGuard,
        AuthService,
        {
            provide: 'IMemberRepository',
            useFactory: (userContext: IUserContext) => {
                const repository = new InMemoryMemberRepository();
                const id = userContext.UserId
                repository.members.push({
                    Id: id,
                    Name: id.substring(0, 8),
                    IsFriend: false
                })
                return repository;
            },
            deps: ['IUserContext']
        },
        {
            provide: 'IFriendRepository',
            useFactory: (memberRepository: IMemberRepository) => new InMemoryFriendRepository(memberRepository),
            deps: ['IMemberRepository']
        },
        {
            provide: 'IBetRepository',
            useFactory: (memberRepository: InMemoryMemberRepository,
                        userContext: IUserContext
            ) => {
                const members = memberRepository.members.map(x => x.Id);
                members.push(userContext.UserId)
                const repo = new InMemoryBetRepository(memberRepository, 
                                            userContext,
                                        [new Bet("id", "description", new Date("2025-02-02"), 200, members)])
                return repo;
            },
            deps: ['IMemberRepository', 'IUserContext']
        },
        {
            provide: FriendsPresenter,
            useFactory: () => new FriendsPresenter()
        },
        {
            provide: 'IIdGenerator',
            useFactory: () => new IdGenerator()
        },
        {
            provide: 'IDateTimeProvider',
            useFactory: () => new DateTimeProvider()
        },
        {
            provide: 'IUserContext',
            useFactory: () => new UserContext()
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}