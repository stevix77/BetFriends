import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CreateBetComponent } from './create-bet/create-bet.component';
import { CreateBetViewModel } from './CreateBetViewModel';
import { FriendsPresenter } from '../../../../../adapters/presenters/FriendsPresenter';
import { CreateBetPresenter } from '../../../../../adapters/presenters/CreateBetPresenter';
import { type IFriendRepository } from '../../../../../../domain/friends/IFriendRepository';
import { type IMemberRepository } from '../../../../../../domain/members/IMemberRepository';
import { AddFriendHandler } from '../../../../../../domain/features/AddFriendHandler';
import { RetrieveFriendsHandler } from '../../../../../../domain/features/RetrieveFriendsHandler';
import { RetrieveMembersHandler } from '../../../../../../domain/features/RetrieveMembersHandler';
import { FriendsController } from '../../../../../adapters/controllers/FriendsController';
import { BetsController } from '../../../../../adapters/controllers/BetsController';
import { CreateBetHandler } from '../../../../../../domain/features/CreateBetHandler';
import { type IBetRepository } from '../../../../../../domain/bets/IBetRepository';
import { type IIdGenerator } from '../../../../../../domain/abstractions/IIdGenerator';
import { type IDateTimeProvider } from '../../../../../../domain/abstractions/IDateTimeProvider';
import { FormsModule } from '@angular/forms';

const createBetPresenter = new CreateBetPresenter();

@NgModule({
  declarations: [CreateBetComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
          path: 'bets', component: CreateBetComponent,
          children: [
            {
              path: 'new', component: CreateBetComponent
            }
          ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: CreateBetHandler,
      useFactory: (betRepository: IBetRepository, 
                  idGenerator: IIdGenerator,
                  dateTimeProvider: IDateTimeProvider) => 
        new CreateBetHandler(betRepository, createBetPresenter, idGenerator, dateTimeProvider),
      deps: ['IBetRepository', 'IIdGenerator', 'IDateTimeProvider']
    },
    {
      provide: CreateBetViewModel,
      useFactory: (friendsPresenter: FriendsPresenter,
                    friendRepository: IFriendRepository,
                    memberRepository: IMemberRepository,
                    createBetHandler: CreateBetHandler,
                    router: Router) => {
        const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository, friendsPresenter);
        const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository, friendsPresenter);
        const addFriendHandler = new AddFriendHandler(friendRepository, friendsPresenter)
        const friendsController = new FriendsController(retrieveFriendsHandler, 
                                                        retrieveMembersHandler,
                                                        addFriendHandler)
        const betsController = new BetsController(createBetHandler)
        return new CreateBetViewModel(friendsPresenter, 
                                      createBetPresenter, 
                                      friendsController, 
                                      betsController,
                                      router);
      },
      deps: [FriendsPresenter, 'IFriendRepository', 'IMemberRepository', CreateBetHandler, Router]
    }
  ]
})
export class BetsModule { }
