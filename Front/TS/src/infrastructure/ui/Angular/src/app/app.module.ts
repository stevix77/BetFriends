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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FriendsModule,
        BetsModule,
        NavbarComponent
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
            useFactory: () => new InMemoryBetRepository()
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
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}