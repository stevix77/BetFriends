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
import { InMemoryBetAnswerRepository } from '../../../repositories/InMemoryBetAnswerRepository';

@Module({
  imports: [FriendModule, BetsModule],
  controllers: [AppController],
  exports: [InMemoryFriendshipRepository,
            InMemoryMemberRepository,
            InMemoryBetRepository,
            InMemoryRetrieveBetsDataAccess,
            'IUserContext',
            'IDateTimeProvider',
            'IAnswerBetRepository'
        ],
  providers: [
    AppService,
    {
      provide: InMemoryMemberRepository,
      useFactory: () => new InMemoryMemberRepository([
        new Member(new MemberId("11111111-1111-1111-1111-111111111111"), "member1", 1000, 5),
        new Member(new MemberId("adadadad-1111-6666-4444-edededededed"), "member2", 1000, 5)
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
      useFactory: (betRepository: InMemoryBetRepository,
                    memberRepository: InMemoryMemberRepository) => new InMemoryRetrieveBetsDataAccess(betRepository, memberRepository),
      inject: [InMemoryBetRepository, InMemoryMemberRepository] 
    },
    {
      provide: 'IAnswerBetRepository',
      useClass: InMemoryBetAnswerRepository
    },
    {
        provide: 'IUserContext',
        useClass: FakeUserContext
    },
    {
      provide: 'IDateTimeProvider',
      useClass: DateTimeProvider
    }
  ],
})
export class AppModule {}
