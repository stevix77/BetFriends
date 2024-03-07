using BetFriends.Domain.Friends;
using BetFriends.Domain.Friendships;
using BetFriends.Infrastructure.Event;

namespace BetFriends.Infrastructure.Repositories;

internal class FakeFriendshipRepository(DomainEventsAccessor domainEventAccessor) : IFriendshipRepository
{
    private readonly List<Friendship> friendships = [];

    public Task SaveAsync(Friendship friendship)
    {
        friendships.Add(friendship);
        domainEventAccessor.Add(friendship.Events);
        return Task.CompletedTask;
    }
}
