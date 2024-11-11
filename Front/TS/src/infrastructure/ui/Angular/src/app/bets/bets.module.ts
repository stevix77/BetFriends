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
import { RetrieveBetsComponent } from './retrieve-bets/retrieve-bets.component';
import { BetsViewModel } from './BetsViewModel';
import { RetrieveBetsHandler } from '../../../../../../domain/features/RetrieveBetsHandler';
import { AnswerBetHandler } from '../../../../../../domain/features/AnswerBetHandler';
import { AnswerBetPresenter } from '../../../../../adapters/presenters/AnswerBetPresenter';
import { IUserContext } from '../../../../../../domain/abstractions/IUserContext';

const createBetPresenter = new CreateBetPresenter();
const answerPresenter = new AnswerBetPresenter();

@NgModule({
  declarations: [CreateBetComponent, RetrieveBetsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: RetrieveBetsComponent,
      },
      {
        path: 'bets/new', component: CreateBetComponent
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
      provide: RetrieveBetsHandler,
      useFactory: (betRepository: IBetRepository) => 
        new RetrieveBetsHandler(betRepository),
      deps: ['IBetRepository']
    },
    {
      provide: AnswerBetHandler,
      useFactory: (betRepository: IBetRepository, 
                  dateTimeProvider: IDateTimeProvider,
                userContext: IUserContext) => 
        new AnswerBetHandler(betRepository, dateTimeProvider, answerPresenter, userContext),
      deps: ['IBetRepository', 'IDateTimeProvider', 'IUserContext']
    },
    {
      provide: BetsController,
      useFactory: (retrieveBetsHandler: RetrieveBetsHandler,
                    createBetHandler: CreateBetHandler,
                    answerBetHandler: AnswerBetHandler) => new BetsController(createBetHandler, retrieveBetsHandler, answerBetHandler),
      deps: [RetrieveBetsHandler, CreateBetHandler, AnswerBetHandler]
    },
    {
      provide: CreateBetViewModel,
      useFactory: (friendsPresenter: FriendsPresenter,
                    friendRepository: IFriendRepository,
                    memberRepository: IMemberRepository,
                    betsController: BetsController,
                    router: Router) => {
        const retrieveFriendsHandler = new RetrieveFriendsHandler(friendRepository, friendsPresenter);
        const retrieveMembersHandler = new RetrieveMembersHandler(memberRepository, friendsPresenter);
        const addFriendHandler = new AddFriendHandler(friendRepository, friendsPresenter)
        const friendsController = new FriendsController(retrieveFriendsHandler, 
                                                        retrieveMembersHandler,
                                                        addFriendHandler)
        return new CreateBetViewModel(friendsPresenter, 
                                      createBetPresenter, 
                                      friendsController, 
                                      betsController,
                                      router);
      },
      deps: [FriendsPresenter, 'IFriendRepository', 'IMemberRepository', BetsController, Router]
    },
    {
      provide: BetsViewModel,
      useFactory: (betsController: BetsController,
                   userContext: IUserContext,
                   dateTimeProvider: IDateTimeProvider
      ) => new BetsViewModel(betsController, answerPresenter, userContext, dateTimeProvider),
      deps: [BetsController, 'IUserContext', 'IDateTimeProvider']
    }
  ]
})
export class BetsModule { }
