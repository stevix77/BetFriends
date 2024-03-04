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
    imports: [forwardRef(() => AppModule)],
    providers: [
        {
            provide: InMemoryMemberRepository,
            useFactory: () => new InMemoryMemberRepository(),
        },
        {
            provide: InMemoryFriendshipRepository,
            useFactory: () => new InMemoryFriendshipRepository(),
        },
        {
            provide: AddFriendPresenter,
            useFactory: () => new AddFriendPresenter()
        },
        {
            provide: AddFriendCommandHandler,
            useFactory: (memberRepository: InMemoryMemberRepository,
                        friendshipRepository: InMemoryFriendshipRepository,
                        presenter: AddFriendPresenter,
                        userContext: FakeUserContext)
                        => new AddFriendCommandHandler(friendshipRepository, 
                                                    memberRepository,
                                                    userContext,
                                                    presenter),
            inject: [InMemoryFriendshipRepository, 
                    InMemoryMemberRepository, 
                    AddFriendPresenter,
                    FakeUserContext]
        }
    ]
})
export class FriendModule {}
