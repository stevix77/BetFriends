using BetFriends.Bets.Domain.Friendships;

namespace BetFriends.Bets.Domain.Friends;

public interface IFriendshipRepository
{
    Task SaveAsync(Friendship friendship);
}
