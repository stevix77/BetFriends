using BetFriends.Domain.Events;
using BetFriends.Shared.Domain;

namespace BetFriends.Domain.Friendships;

public class Friendship : Entity
{
    private readonly Guid friendId;
    private readonly Guid requesterId;

    private Friendship(Guid friendId, Guid requesterId)
    {
        this.friendId = friendId;
        this.requesterId = requesterId;
        AddEvent(new FriendshipRequested(requesterId, friendId));
    }

    public Guid FriendId { get => friendId; }
    public Guid RequesterId { get => requesterId; }

    internal static Friendship Create(Guid memberId, Guid requesterId)
    {
        return new Friendship(memberId, requesterId);
    }
}
