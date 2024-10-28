import { Module } from '@nestjs/common';
import { Member } from '../../../../domain/members/Member';
import { MemberId } from '../../../../domain/members/MemberId';
import { InMemoryFriendshipRepository } from '../../../repositories/InMemoryFriendshipRepository';
import { InMemoryMemberRepository } from '../../../repositories/InMemoryMemberRepository';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateTimeProvider } from './DateTimeProvider';
import { FakeUserContext } from './FakeUserContext';
import { FriendModule } from './friend/friend.module';
import { InMemoryBetRepository } from '../../../repositories/InMemoryBetRepository';
import { BetsModule } from './bet/bets.module';
import { InMemoryRetrieveBetsDataAccess } from '../../../repositories/InMemoryRetrieveBetsDataAccess';

@Module({
  imports: [FriendModule, BetsModule],
  controllers: [AppController],
  exports: [InMemoryFriendshipRepository,
            InMemoryMemberRepository,
            InMemoryBetRepository,
            InMemoryRetrieveBetsDataAccess,
            FakeUserContext,
            DateTimeProvider
        ],
  providers: [
    AppService,
    {
      provide: InMemoryMemberRepository,
      useFactory: () => new InMemoryMemberRepository([
        new Member(new MemberId("11111111-1111-1111-1111-111111111111"), 1000, 5),
        new Member(new MemberId("adadadad-1111-6666-4444-edededededed"), 1000, 5)
      ]),
    },
    {
        provide: InMemoryFriendshipRepository,
        useFactory: () => new InMemoryFriendshipRepository()
    },
    {
      provide: InMemoryBetRepository,
      useClass: InMemoryBetRepository
    },
    {
      provide: InMemoryRetrieveBetsDataAccess,
      useFactory: (betRepository: InMemoryBetRepository) => new InMemoryRetrieveBetsDataAccess(betRepository),
      inject: [InMemoryBetRepository] 
    },
    {
        provide: FakeUserContext,
        useClass: FakeUserContext
    },
    {
      provide: DateTimeProvider,
      useClass: DateTimeProvider
    }
  ],
})
export class AppModule {}
