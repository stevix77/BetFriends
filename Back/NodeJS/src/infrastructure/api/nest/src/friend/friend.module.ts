import { Module, forwardRef } from '@nestjs/common';
import { AddFriendController } from './features/add-friend/AddFriend.controller';
import { AppModule } from 'src/app.module';
import { InMemoryMemberRepository } from '../../../../../infrastructure/repositories/InMemoryMemberRepository'
import { InMemoryFriendshipRepository } from '../../../../../infrastructure/repositories/InMemoryFriendshipRepository'
import { AddFriendPresenter } from './features/add-friend/AddFriendPresenter';
import { AddFriendCommandHandler } from '../../../../../application/features/add-friend/AddFriendHandler';
import { FakeUserContext } from 'src/FakeUserContext';
import { BetModule } from '../../../../BetModule';
import { Member } from '../../../../../domain/members/Member';
import { MemberId } from '../../../../../domain/members/MemberId';
import { LoggingBehavior } from '../../../../behaviors/LoggingBehavior';
import { RequestBehavior } from '../../../../behaviors/RequestBehavior';

@Module({
    controllers: [AddFriendController],
    imports: [forwardRef(() => AppModule)],
    providers: [
        {
            provide: InMemoryMemberRepository,
            useFactory: () => new InMemoryMemberRepository([new Member(new MemberId("11111111-1111-1111-1111-111111111111"))]),
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
            useFactory: (friendshipRepository: InMemoryFriendshipRepository,memberRepository: InMemoryMemberRepository,
                        presenter: AddFriendPresenter,
                        userContext: FakeUserContext) => 
                        new AddFriendCommandHandler(friendshipRepository, 
                                                    memberRepository,
                                                    userContext,
                                                    presenter),
                        
            inject: [InMemoryFriendshipRepository, 
                    InMemoryMemberRepository, 
                    AddFriendPresenter,
                    FakeUserContext]
        },
        {
            provide: "IBetModule",
            useFactory: (addFriendCommandHandler: AddFriendCommandHandler) => {
                const behavior = new LoggingBehavior().SetNext(new RequestBehavior([addFriendCommandHandler]))
                return new BetModule(behavior)
            },
            inject: [AddFriendCommandHandler]
        },
        {
            provide: FakeUserContext,
            useClass: FakeUserContext
        }
    ]
})
export class FriendModule {}
