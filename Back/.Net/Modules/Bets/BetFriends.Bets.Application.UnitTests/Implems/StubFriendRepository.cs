using BetFriends.Bets.Domain.Friends;
using BetFriends.Bets.Domain.Friendships;

namespace BetFriends.Bets.Application.UnitTests.Implems;

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
