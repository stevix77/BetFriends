using BetFriends.Domain.Bets;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;

namespace BetFriends.Infrastructure.Repository;

internal class InMemoryBetRepository : IBetRepository
{
    private readonly List<Bet> bets = [];

    public Task<IEnumerable<RetrieveBetsItemResponse>> RetrieveBetsAsync()
    {
        return Task.FromResult(bets.Select(x => new RetrieveBetsItemResponse(Guid.Parse(x.Id),
                                                                             x.Description,
                                                                             x.Coins,
                                                                             x.EndDate,
                                                                             Guid.Empty,
                                                                             x.Id[^6..])));
    }

    public Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        bets.Add(bet);
        return Task.CompletedTask;
    }
}
