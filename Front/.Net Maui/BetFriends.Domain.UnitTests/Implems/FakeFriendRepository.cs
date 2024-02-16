using BetFriend.Domain.Friends;

namespace BetFriend.Domain.UnitTests.Implems;

internal class FakeFriendRepository : IFriendRepository
{
    public FakeFriendRepository()
    {
        friends = new List<string>();
    }

    private List<string> friends;
    public IReadOnlyCollection<string> Friends { get => friends; }

    public Task AddAsync(string id, CancellationToken cancellationToken)
    {
        friends.Add(id);
        return Task.CompletedTask;
    }
}
