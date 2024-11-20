using BetFriends.Domain.Features.CompleteBet;
using BetFriends.Domain.UnitTests.Implems;

namespace BetFriends.Domain.UnitTests;

public class CompleteBetHandlerTest
{
    [Fact]
    public async Task ShouldCompleteBetWithoutProofWhenBookieFailed()
    {
        var request = new CompleteBetRequest("betId", false);
        var userContext = new StubUserContext("userId");
        var presenter = new MockCompleteBetPresenter();
        var repository = new MockBetRepository(userContext);
        var handler = new CompleteBetHandler(repository, presenter);
        await handler.Handle(request, CancellationToken.None);
        Assert.Equal("bet betId completed", presenter.Message);
        Assert.Contains(repository.BetsCompleted, x => x.Item1 == "betId");
    }

    [Fact]
    public async Task ShouldNotCompleteBetWithoutProofWhenBookieSucceded()
    {
        var request = new CompleteBetRequest("betId", true);
        var userContext = new StubUserContext("userId");
        var presenter = new MockCompleteBetPresenter();
        var repository = new MockBetRepository(userContext);
        var handler = new CompleteBetHandler(repository, presenter);
        await handler.Handle(request, CancellationToken.None);
        Assert.Equal("proof is missing for bet betId", presenter.Message);
        Assert.Empty(repository.BetsCompleted);
    }
}
