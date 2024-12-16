using BetFriends.Bets.Domain.Friends;
using BetFriends.Bets.Domain.Friendships;
using BetFriends.Shared.Infrastructure.Event;

namespace BetFriends.Bets.Infrastructure.Repositories;

internal class FakeFriendshipRepository : IFriendshipRepository
{
    private readonly List<Friendship> friendships = [];
    private readonly DomainEventsAccessor domainEventAccessor;

    public FakeFriendshipRepository(DomainEventsAccessor domainEventAccessor)
    {
        this.domainEventAccessor = domainEventAccessor;
    }

    public Task SaveAsync(Friendship friendship)
    {
        friendships.Add(friendship);
        domainEventAccessor.Add(friendship.Events);
        return Task.CompletedTask;
    }
}
