using BetFriends.Domain.Bets;

namespace BetFriends.Infrastructure.Repositories;

internal class FakeBetRepository : IBetRepository
{
    private readonly ICollection<Bet> bets;

    public FakeBetRepository()
    {
        bets = new HashSet<Bet>();
    }
    public Task SaveAsync(Bet bet)
    {
        bets.Add(bet);
        return Task.CompletedTask;
    }
}
