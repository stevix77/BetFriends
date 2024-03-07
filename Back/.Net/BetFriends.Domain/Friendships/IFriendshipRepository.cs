using BetFriends.Domain.Friendships;

namespace BetFriends.Domain.Friends;

public interface IFriendshipRepository
{
    Task SaveAsync(Friendship friendship);
}
