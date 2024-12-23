import { Module, forwardRef } from '@nestjs/common';
import { AddFriendController } from './features/add-friend/AddFriend.controller';
import { AppModule } from 'src/app.module';
import { InMemoryMemberRepository } from '../../../../modules/bets/src/infrastructure/repositories/InMemoryMemberRepository'
import { InMemoryFriendshipRepository } from '../../../../modules/bets/src/infrastructure/repositories/InMemoryFriendshipRepository'
import { AddFriendPresenter } from './features/add-friend/AddFriendPresenter';
import { AddFriendCommandHandler } from '../../../../modules/bets/src/application/features/add-friend/AddFriendHandler';
import { StubUserContext } from 'src/userContext/StubUserContext';

@Module({
    controllers: [AddFriendController],
    exports: [AddFriendCommandHandler],
    imports: [forwardRef(() => AppModule)],
    providers: [
        {
            provide: AddFriendPresenter,
            useFactory: () => new AddFriendPresenter()
        },
        {
            provide: AddFriendCommandHandler,
            useFactory: (friendshipRepository: InMemoryFriendshipRepository,
                        memberRepository: InMemoryMemberRepository,
                        presenter: AddFriendPresenter,
                        userContext: StubUserContext) => 
                        new AddFriendCommandHandler(friendshipRepository, 
                                                    memberRepository,
                                                    userContext,
                                                    presenter),
                        
            inject: [InMemoryFriendshipRepository, 
                    InMemoryMemberRepository, 
                    AddFriendPresenter,
                    'IUserContext']
        }
    ]
})
export class FriendModule {}
