import { describe, expect, test } from "vitest";
import { BetAnsweredNotification } from "../../../src/application/features/answer-bet/BetAnsweredNotification";
import { UpdateBalanceGamblerHandler } from "../../../src/application/features/answer-bet/UpdateBalanceGamblerHandler";
import { AnswerBet } from "../../../src/domain/answerBets/AnswerBet";
import { Bet } from "../../../src/domain/bets/Bet";
import { BetId } from "../../../src/domain/bets/BetId";
import { Member } from "../../../src/domain/members/Member";
import { MemberId } from "../../../src/domain/members/MemberId";
import { DomainEventAccessor } from "../../../src/infrastructure/events/DomainEventAccessor";
import { InMemoryBetAnswerRepository } from "../../../src/infrastructure/repositories/InMemoryBetAnswerRepository";
import { InMemoryBetRepository } from "../../../src/infrastructure/repositories/InMemoryBetRepository";
import { InMemoryMemberRepository } from "../../../src/infrastructure/repositories/InMemoryMemberRepository";
import { StubDateTimeProvider } from "../implems/StubDateTimeProvider";

describe('Update balance gambler handle', () => {
    test('should decrease balance when gambler accept bet', async () => {
        const notification = new BetAnsweredNotification("betId", "gamblerId", true);
        const bet = Bet.Create(new BetId("betId"), 
                             new MemberId('memberId'), 
                             "description", 
                             100, 
                             new Date(2024, 12, 22), 
                             ['gamblerId'], 
                             new StubDateTimeProvider(new Date(2024, 10, 10)))
        const gambler = new Member(new MemberId('gamblerId'), "username", 200, 5);
        const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [bet])
        const memberRepository = new InMemoryMemberRepository([gambler])
        const handler = new UpdateBalanceGamblerHandler(memberRepository, betRepository)
        await handler.Handle(notification);
        expect(gambler.Coins).toEqual(100)
     })
 
     test('should not decrease balance gambler when reject bet', async () => {
         const notification = new BetAnsweredNotification("betId", "gamblerId", false);
         const bet = Bet.Create(new BetId("betId"), 
                              new MemberId('memberId'), 
                              "description", 
                              100, 
                              new Date(2024, 12, 22), 
                              ['gamblerId'], 
                              new StubDateTimeProvider(new Date(2024, 10, 10)))
         const gambler = new Member(new MemberId('gamblerId'), "username", 200, 5);
         const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [bet])
         const memberRepository = new InMemoryMemberRepository([gambler])
         const handler = new UpdateBalanceGamblerHandler(memberRepository, betRepository)
         await handler.Handle(notification);
         expect(gambler.Coins).toEqual(200)
      })
 
      test('should not increase balance gambler when bet does not exist', async () => {
         const notification = new BetAnsweredNotification("betId", "gamblerId", true);
         const member = new Member(new MemberId('gamblerId'), "username", 200, 5);
         const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [])
         const memberRepository = new InMemoryMemberRepository([member])
         const handler = new UpdateBalanceGamblerHandler(memberRepository, betRepository)
         await expect(() => handler.Handle(notification)).rejects.toThrowError()
      })
})