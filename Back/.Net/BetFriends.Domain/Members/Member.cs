using BetFriends.Domain.Bets;
using BetFriends.Domain.Friendships;
using BetFriends.Domain.Members.Exceptions;

namespace BetFriends.Domain.Members;

public class Member : Entity
{
    private readonly MemberId memberId;
    private readonly string username;
    private readonly int chips;
    private readonly int countFriends;

    public Member(MemberId memberId, string username, int chips, int countFriends)
    {
        this.memberId = memberId;
        this.username = username;
        this.chips = chips;
        this.countFriends = countFriends;
    }

    public MemberId MemberId { get => memberId; }

    public Friendship AddFriendship(Guid requesterId)
    {
        return Friendship.Create(memberId.Value, requesterId);
    }

    public Bet Bet(BetId betId,
                   string description,
                   int chips,
                   DateTime endDate,
                   IEnumerable<Guid> friends)
    {
        if (this.chips < chips)
            throw new CannotBetException(CannotBetException.ChipsNotEnough);

        if (!HasFriend())
            throw new CannotBetException(CannotBetException.NoneFriends);
        return Bets.Bet.Create(betId,
                               memberId,
                               description,
                               chips,
                               endDate,
                               friends);
    }

    private bool HasFriend()
    {
        return countFriends != 0;
    }
}
