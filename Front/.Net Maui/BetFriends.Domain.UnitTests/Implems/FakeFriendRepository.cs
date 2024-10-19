using BetFriend.Domain.Friends;
using BetFriends.Domain.Features.RetrieveFriends;

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

    public Task<IReadOnlyCollection<FriendDto>> GetFriendsAsync()
    {
        throw new NotImplementedException();
    }
}
