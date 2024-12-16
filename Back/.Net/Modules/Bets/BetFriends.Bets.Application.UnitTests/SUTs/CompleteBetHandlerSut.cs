
using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.UnitTests.Implems;
using BetFriends.Bets.Domain.Bets;

namespace BetFriends.Bets.Application.UnitTests.SUTs;

internal class CompleteBetHandlerSut
{
    private readonly Guid betId;
    private readonly Guid memberId;
    private readonly CompleteBetPresenter outputPort;
    private Bet bet;
    private StubUserContext userContext;
    private Exception exception;

    public CompleteBetHandlerSut(Guid betId, Guid memberId)
    {
        this.betId = betId;
        this.memberId = memberId;
        outputPort = new CompleteBetPresenter();
    }

    internal void ShouldCompleteBet(bool isSuccessful)
    {
        Assert.Equal(isSuccessful, bet.IsSuccessful);
        Assert.Equal(new CompleteBetResponse(betId, isSuccessful), outputPort.Response);
    }

    internal void ShouldFailToCompleteBet(string exceptionMessage)
    {
        Assert.Null(bet.IsSuccessful);
        Assert.Equal(exceptionMessage, exception.Message);
    }

    internal void ShouldNotCompleteBet(string errorMessage)
    {
        Assert.Equal(errorMessage, outputPort.ErrorMessage);
    }

    internal async Task<CompleteBetHandlerSut> WhenExecuteHandler(CompleteBetCommand completeBetCommand)
    {
        var handler = new CompleteBetCommandHandler(new MockBetRepository(bet), outputPort, userContext);
        await handler.Handle(completeBetCommand, CancellationToken.None);
        return this;
    }

    internal async Task<CompleteBetHandlerSut> WhenHandlerFailed(CompleteBetCommand completeBetCommand)
    {
        var handler = new CompleteBetCommandHandler(new MockBetRepository(bet), outputPort, userContext);
        exception = await Record.ExceptionAsync(() => handler.Handle(completeBetCommand, CancellationToken.None));
        return this;
    }

    internal CompleteBetHandlerSut WithBet()
    {
        bet = Bet.Create(new(betId), new(memberId), "description", 150, new(2024, 11, 11), [], new(2024, 1, 1));
        return this;
    }

    internal CompleteBetHandlerSut WithUser(Guid userId)
    {
        userContext = new StubUserContext(userId);
        return this;
    }
}
