using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Application.UnitTests.SUTs;

namespace BetFriends.Bets.Application.UnitTests.Features;

public class CompleteBetHandlerTest
{
    [Fact]
    public async Task ShouldCompleteBet()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new CompleteBetHandlerSut(betId, memberId)
            .WithBet()
            .WithUser(memberId)
            .WhenExecuteHandler(new CompleteBetCommand(betId, false)))
            .ShouldCompleteBet(false);
    }


    [Fact]
    public async Task ShouldNotCompleteBetWhenBetDoesNotExist()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new CompleteBetHandlerSut(betId, memberId)
            .WhenExecuteHandler(new CompleteBetCommand(betId, false)))
            .ShouldNotCompleteBet($"bet {betId} does not exist");
    }

    [Fact]
    public async Task ShouldNotCompleteBetWhenUserIsNotTheBookie()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        var userId = Guid.NewGuid();
        (await new CompleteBetHandlerSut(betId, memberId)
            .WithBet()
            .WithUser(userId)
            .WhenHandlerFailed(new CompleteBetCommand(betId, false)))
            .ShouldFailToCompleteBet($"bookie {userId} is not the bet owner");
    }

    [Fact]
    public async Task ShouldNotCompleteSuccessfulBetWithoutProof()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new CompleteBetHandlerSut(betId, memberId)
            .WithBet()
            .WithUser(memberId)
            .WhenHandlerFailed(new CompleteBetCommand(betId, true)))
            .ShouldFailToCompleteBet("successful bet needs a proof");
    }

    [Fact]
    public async Task ShouldCompleteSuccessfulBetWithProof()
    {
        var betId = Guid.NewGuid();
        var memberId = Guid.NewGuid();
        (await new CompleteBetHandlerSut(betId, memberId)
            .WithBet()
            .WithUser(memberId)
            .WhenExecuteHandler(new CompleteBetCommand(betId, true, "proofBs64")))
            .ShouldCompleteBet(true);
    }
}