using BetFriends.Domain.Bets;
using BetFriends.Domain.Features.CreateBet;

namespace BetFriends.Domain.UnitTests.Implems;

internal class StubBetRepository : IBetRepository
{
    private List<Bet> bets = new List<Bet>();
    public IReadOnlyCollection<Bet> Bets { get => bets; }
    public StubBetRepository()
    {

    }

    public Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        bets.Add(bet);
        return Task.CompletedTask;
    }
}
