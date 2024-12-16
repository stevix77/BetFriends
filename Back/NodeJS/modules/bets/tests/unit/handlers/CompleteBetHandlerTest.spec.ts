import { describe, test } from "vitest";
import { Bet } from "../../../src/domain/bets/Bet";
import { BetId } from "../../../src/domain/bets/BetId";
import { MemberId } from "../../../src/domain/members/MemberId";
import { StubDateTimeProvider } from "../implems/StubDateTimeProvider";
import { CompleteBetCommand } from "../../../src/application/features/complete-bet/CompleteBetHandler";
import { CompleteBetSut } from "../SUTs/CompleteBetSut";

describe('complete bet', () => {
    test('should complete unsuccessful bet', async () => {
        (await new CompleteBetSut()
                    .WithBet(Bet.Create(new BetId("betId"), 
                                        new MemberId('memberId'), 
                                        "description", 
                                        100, 
                                        new Date(2024, 12, 22), 
                                        [], 
                                        new StubDateTimeProvider(new Date(2024, 10, 10))))
                    .WithUser('memberId')
                    .WhenExecuteHandler(new CompleteBetCommand('betId' , false)))
                    .ShouldCompleteBet(false);
    })

    test('should not complete unknown bet', async () => {
        (await new CompleteBetSut()
                    .WithBet(Bet.Create(new BetId("noBetId"), 
                    new MemberId('memberId'), 
                    "description", 
                    100, 
                    new Date(2024, 12, 22), 
                    [], 
                    new StubDateTimeProvider(new Date(2024, 10, 10))))
                    .WhenExecuteHandler(new CompleteBetCommand('betId' , false)))
                    .ShouldCompleteNotBet('bet betId does not exist');
    })

    test('should not complete successful bet without proof', async () => {
        (await new CompleteBetSut()
                    .WithBet(Bet.Create(new BetId("betId"), 
                    new MemberId('memberId'), 
                    "description", 
                    100, 
                    new Date(2024, 12, 22), 
                    [], 
                    new StubDateTimeProvider(new Date(2024, 10, 10))))
                    .WhenExecuteHandler(new CompleteBetCommand('betId', true)))
                    .ShouldCompleteNotBet('command has no proof');
    })

    test('should not complete bet when requester is not the bookie', async () => {
        (await new CompleteBetSut()
                    .WithBet(Bet.Create(new BetId("betId"), 
                    new MemberId('memberId'), 
                    "description", 
                    100, 
                    new Date(2024, 12, 22), 
                    [], 
                    new StubDateTimeProvider(new Date(2024, 10, 10))))
                    .WithUser('noMemberId')
                    .WhenExecuteHandler(new CompleteBetCommand('betId', false)))
                    .ShouldCompleteNotBet('noMemberId is not authorized');
    })
})

