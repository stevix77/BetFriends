import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CreateBetComponent } from './create-bet/create-bet.component';
import { CreateBetViewModel } from './CreateBetViewModel';
import { FriendsPresenter } from '../../../../../adapters/presenters/FriendsPresenter';
import { CreateBetPresenter } from '../../../../../adapters/presenters/CreateBetPresenter';
import { CompleteBetPresenter } from '../../../../../adapters/presenters/CompleteBetPresenter'
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
import { CompleteBetComponent } from './complete-bet/complete-bet.component';
import { CompleteBetHandler } from '../../../../../../domain/features/CompleteBetHandler';
import { CompleteBetViewModel } from './CompleteBetViewModel';
import { GetProofHandler } from '../../../../../../domain/features/GetProofHandler';

const createBetPresenter = new CreateBetPresenter();
const answerPresenter = new AnswerBetPresenter();
const completeBetPresenter = new CompleteBetPresenter();

@NgModule({
  declarations: [CreateBetComponent, RetrieveBetsComponent, CompleteBetComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: RetrieveBetsComponent,
      },
      {
        path: 'bets/new', component: CreateBetComponent
      },
      {
        path: 'complete/:betId', component: CompleteBetComponent
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
      provide: CompleteBetHandler,
      useFactory: (betRepository: IBetRepository) => 
        new CompleteBetHandler(betRepository, completeBetPresenter),
      deps: ['IBetRepository']
    },
    {
      provide: GetProofHandler,
      useFactory: (betRepository: IBetRepository) => 
        new GetProofHandler(betRepository),
      deps: ['IBetRepository']
    },
    {
      provide: BetsController,
      useFactory: (retrieveBetsHandler: RetrieveBetsHandler,
                    createBetHandler: CreateBetHandler,
                    answerBetHandler: AnswerBetHandler,
                    completeBetHandler: CompleteBetHandler,
                    getProofHandler: GetProofHandler) => new BetsController(createBetHandler, 
                                                                                retrieveBetsHandler, 
                                                                                answerBetHandler, 
                                                                                completeBetHandler,
                                                                                getProofHandler),
      deps: [RetrieveBetsHandler, 
          CreateBetHandler, 
          AnswerBetHandler,
          CompleteBetHandler,
          GetProofHandler]
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
                   dateTimeProvider: IDateTimeProvider,
                   router: Router
      ) => new BetsViewModel(betsController, 
                              answerPresenter, 
                              userContext, 
                              dateTimeProvider, 
                              router),
      deps: [BetsController, 'IUserContext', 'IDateTimeProvider', Router]
    },
    {
      provide: CompleteBetViewModel,
      useFactory: (betsController: BetsController, 
                  router: Router) => new CompleteBetViewModel(betsController, router, completeBetPresenter),
      deps: [BetsController, Router]
    }
  ]
})
export class BetsModule { }
