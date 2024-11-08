using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.UnitTests.Implems;

namespace BetFriends.Domain.UnitTests.SUTs;

internal class CreateBetSut
{
    private StubDateTimeProvider dateTimeProvider = default!;
    private readonly MockBetRepository betRepository = new(default!);
    private CreateBetRequest request = default!;
    private readonly StubIdGenerator idGenerator = new StubIdGenerator("id");
    private readonly StubCreateBetPresenter presenter = new StubCreateBetPresenter();
    internal CreateBetSut WithDateProvider(StubDateTimeProvider stubDateTimeProvider)
    {
        dateTimeProvider = stubDateTimeProvider;
        return this;
    }

    internal CreateBetSut WithRequest(CreateBetRequest createBetRequest)
    {
        request = createBetRequest;
        return this;
    }

    internal async Task<CreateBetSut> WhenExecuteCommand()
    {
        var handler = new CreateBetRequestHandler(betRepository, dateTimeProvider, presenter, idGenerator);
        await handler.Handle(request, default!);
        return this;
    }

    internal void ShouldCreateBet()
    {
        Assert.Equal(new CreateBetResponse(idGenerator.Id, request.Description, request.EndDate, request.Chips, request.Friends), presenter.Bet);
        Assert.Contains(betRepository.Bets, x => x == new Bet(idGenerator.Id, request.Description, request.EndDate, request.Chips, request.Friends));
    }

    internal void ShouldNotCreateBet()
    {
        Assert.Empty(betRepository.Bets);
        Assert.Null(presenter.Bet);
    }
}
