
using BetFriends.Domain.Features.RetrieveFriends;

namespace BetFriend.Domain.Friends;

public interface IFriendRepository
{
    Task AddAsync(string id, CancellationToken cancellationToken);
    Task<IReadOnlyCollection<FriendDto>> GetFriendsAsync();
}
