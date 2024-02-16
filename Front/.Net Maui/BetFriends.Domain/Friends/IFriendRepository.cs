
namespace BetFriend.Domain.Friends;

public interface IFriendRepository
{
    Task AddAsync(string id, CancellationToken cancellationToken);
}
