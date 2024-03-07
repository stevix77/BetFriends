using BetFriends.Domain.Friends;
using BetFriends.Domain.Friendships;

namespace BetFriends.Application.UnitTests.Implems;

internal class StubFriendRepository : IFriendshipRepository
{
    public StubFriendRepository()
    {
        Friends = new();
    }

    public List<Friendship> Friends { get; internal set; }

    public Task SaveAsync(Friendship friendship)
    {
        Friends.Add(friendship);
        return Task.CompletedTask;
    }
}
