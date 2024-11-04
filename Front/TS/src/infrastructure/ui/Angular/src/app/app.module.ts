import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BetsModule } from "./bets/bets.module";
import { FriendsModule } from "./friends/friends.module";
import { AppComponent } from "./app.component";
import { type IMemberRepository } from "../../../../../domain/members/IMemberRepository";
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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FriendsModule,
        BetsModule,
        NavbarComponent,
        RouterModule
    ],
    providers:[
        {
            provide: 'IMemberRepository',
            useFactory: () => new InMemoryMemberRepository()
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
                const repo = new InMemoryBetRepository(memberRepository, 
                                            userContext,
                                        [new Bet("id", "description", new Date("2025-02-02"), 200, memberRepository.members.map(x => x.Id))])
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
            useFactory: () => new UserContext('aeaeaeae-aeae-aeae-aeae-aeaeaeaeaeae')
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}