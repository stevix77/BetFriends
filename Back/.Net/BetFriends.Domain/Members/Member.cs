using BetFriends.Domain.Friendships;

namespace BetFriends.Domain.Members;

public class Member : Entity
{
    private readonly MemberId memberId;

    public Member(MemberId memberId)
    {
        this.memberId = memberId;
    }

    public MemberId MemberId { get => memberId; }

    public Friendship AddFriendship(Guid requesterId)
    {
        return Friendship.Create(memberId.Value, requesterId);
    }
}
