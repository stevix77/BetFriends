using BetFriends.Domain.Bets;
using BetFriends.Domain.Features.CreateBet;

namespace BetFriends.Infrastructure.Repository;

internal class InMemoryBetRepository : IBetRepository
{
    private readonly List<Bet> bets = [];
    

    public Task SaveAsync(Bet bet, CancellationToken cancellationToken)
    {
        bets.Add(bet);
        return Task.CompletedTask;
    }
}
