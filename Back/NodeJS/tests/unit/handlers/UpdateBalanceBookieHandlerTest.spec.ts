import { describe, expect, test } from "vitest";
import { BetCompletedNotification } from "../../../src/application/features/complete-bet/BetCompletedNotification";
import { InMemoryBetRepository } from "../../../src/infrastructure/repositories/InMemoryBetRepository";
import { InMemoryBetAnswerRepository } from "../../../src/infrastructure/repositories/InMemoryBetAnswerRepository";
import { InMemoryMemberRepository } from "../../../src/infrastructure/repositories/InMemoryMemberRepository";
import { DomainEventAccessor } from "../../../src/infrastructure/events/DomainEventAccessor";
import { Bet } from "../../../src/domain/bets/Bet";
import { BetId } from "../../../src/domain/bets/BetId";
import { MemberId } from "../../../src/domain/members/MemberId";
import { StubDateTimeProvider } from "../implems/StubDateTimeProvider";
import { UpdateBalanceBookieHandler } from "../../../src/application/features/complete-bet/UpdateBalanceBookieHandler"
import { Member } from "../../../src/domain/members/Member";
import { AnswerBet } from "../../../src/domain/answerBets/AnswerBet";

describe('update balance bookie handler', () => {
    test('should increase balance bookie when bet successful', async () => {
       const notification = new BetCompletedNotification("betId", true);
       const bet = Bet.Create(new BetId("betId"), 
                            new MemberId('memberId'), 
                            "description", 
                            100, 
                            new Date(2024, 12, 22), 
                            ['gamblerId'], 
                            new StubDateTimeProvider(new Date(2024, 10, 10)), true)
       const member = new Member(new MemberId('memberId'), "username", 200, 5);
       const betRepository = new InMemoryBetRepository(new DomainEventAccessor(), [bet])
       const memberRepository = new InMemoryMemberRepository([member])
       const answerBetRepository = new InMemoryBetAnswerRepository([new AnswerBet(bet.BetId, true, new MemberId('gamblerId'))]);
       const handler = new UpdateBalanceBookieHandler(betRepository, memberRepository, answerBetRepository)
       await handler.Handle(notification);
       expect(member.Coins).toEqual(300)
    })
})