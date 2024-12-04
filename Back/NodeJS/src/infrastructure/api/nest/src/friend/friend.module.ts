import { Module, forwardRef } from '@nestjs/common';
import { AddFriendController } from './features/add-friend/AddFriend.controller';
import { AppModule } from 'src/app.module';
import { InMemoryMemberRepository } from '../../../../../infrastructure/repositories/InMemoryMemberRepository'
import { InMemoryFriendshipRepository } from '../../../../../infrastructure/repositories/InMemoryFriendshipRepository'
import { AddFriendPresenter } from './features/add-friend/AddFriendPresenter';
import { AddFriendCommandHandler } from '../../../../../application/features/add-friend/AddFriendHandler';
import { FakeUserContext } from 'src/FakeUserContext';

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
                        userContext: FakeUserContext) => 
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
