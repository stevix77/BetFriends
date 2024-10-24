using BetFriends.Domain.Bets;
using BetFriends.Infrastructure.Event;

namespace BetFriends.Infrastructure.Repositories;

internal class FakeBetRepository : IBetRepository
{
    private readonly ICollection<Bet> bets;
    private readonly DomainEventsAccessor domainEventsAccessor;

    public FakeBetRepository(DomainEventsAccessor domainEventsAccessor)
    {
        bets = new HashSet<Bet>();
        this.domainEventsAccessor = domainEventsAccessor;
    }

    public Task<Bet> GetByIdAsync(BetId betId)
    {
        return Task.FromResult(bets.FirstOrDefault(x => x.BetId == betId))!;
    }

    public Task SaveAsync(Bet bet)
    {
        bets.Add(bet);
        domainEventsAccessor.Add(bet.Events);
        return Task.CompletedTask;
    }
}
