import { describe, expect, test } from "vitest";
import { BetCompletedNotification } from "../../../src/application/features/complete-bet/BetCompletedNotification";
import { UpdateBalanceGamblersHandler } from "../../../src/application/features/complete-bet/UpdateBalanceGamblersHandler";
import { AnswerBet } from "../../../src/domain/answerBets/AnswerBet";
import { Bet } from "../../../src/domain/bets/Bet";
import { BetId } from "../../../src/domain/bets/BetId";
import { Member } from "../../../src/domain/members/Member";
import { MemberId } from "../../../src/domain/members/MemberId";
import { DomainEventAccessor } from "../../../../shared/infrastructure/events/DomainEventAccessor";
import { InMemoryBetAnswerRepository } from "../../../src/infrastructure/repositories/InMemoryBetAnswerRepository";
import { InMemoryBetRepository } from "../../../src/infrastructure/repositories/InMemoryBetRepository";
import { InMemoryMemberRepository } from "../../../src/infrastructure/repositories/InMemoryMemberRepository";
import { StubDateTimeProvider } from "../implems/StubDateTimeProvider";

describe('Update balance gamblers handle', () => {
    test('should increase balance gamblers when bet unsuccessful', async () => {
        const notification = new BetCompletedNotification("betId", false);
        const bet = Bet.Create(new BetId("betId"), 
                             new MemberId('memberId'), 
                             "description", 
                             100, 
                             new Date(2024, 12, 22), 
                             ['gamblerId'], 
                             new StubDateTimeProvider(new Date(2024, 10, 10)), false)
        const member = new Member(new MemberId('gamblerId'), "username", 200, 5);
        const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [bet])
        const memberRepository = new InMemoryMemberRepository([member])
        const answerBetRepository = new InMemoryBetAnswerRepository([new AnswerBet(bet.BetId, true, new MemberId('gamblerId'))]);
        const handler = new UpdateBalanceGamblersHandler(betRepository, memberRepository, answerBetRepository)
        await handler.Handle(notification);
        expect(member.Coins).toEqual(400)
     })
 
     test('should not increase balance gamblers when bet successful', async () => {
         const notification = new BetCompletedNotification("betId", true);
         const bet = Bet.Create(new BetId("betId"), 
                              new MemberId('gamblerId'), 
                              "description", 
                              100, 
                              new Date(2024, 12, 22), 
                              ['gamblerId'], 
                              new StubDateTimeProvider(new Date(2024, 10, 10)), true)
         const member = new Member(new MemberId('gamblerId'), "username", 200, 5);
         const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [bet])
         const memberRepository = new InMemoryMemberRepository([member])
         const answerBetRepository = new InMemoryBetAnswerRepository([new AnswerBet(bet.BetId, true, new MemberId('gamblerId'))]);
         const handler = new UpdateBalanceGamblersHandler(betRepository, memberRepository, answerBetRepository)
         await handler.Handle(notification);
         expect(member.Coins).toEqual(200)
      })
 
      test('should not increase balance gamblers when bet does not exist', async () => {
         const notification = new BetCompletedNotification("betId", false);
         const member = new Member(new MemberId('gamblerId'), "username", 200, 5);
         const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [])
         const memberRepository = new InMemoryMemberRepository([member])
         const answerBetRepository = new InMemoryBetAnswerRepository([]);
         const handler = new UpdateBalanceGamblersHandler(betRepository, memberRepository, answerBetRepository)
         await expect(() => handler.Handle(notification)).rejects.toThrowError()
      })
})