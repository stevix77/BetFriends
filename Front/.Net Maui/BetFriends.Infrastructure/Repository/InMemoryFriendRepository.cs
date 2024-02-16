using BetFriend.Domain.Friends;

namespace BetFriend.Infrastructure.Repository;

internal class InMemoryFriendRepository : IFriendRepository
{
    private readonly List<string> friends = new();
    public InMemoryFriendRepository()
    {
        
    }
    public Task AddAsync(string id, CancellationToken cancellationToken)
    {
        friends.Add(id);
        return Task.CompletedTask;
    }
}
