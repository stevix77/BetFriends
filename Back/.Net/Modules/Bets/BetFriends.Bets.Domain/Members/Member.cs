using BetFriends.Bets.Domain.Friendships;
using BetFriends.Bets.Domain.Members.Exceptions;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Shared.Domain;

namespace BetFriends.Bets.Domain.Members;

public class Member : Entity
{
    private readonly MemberId memberId;
    private readonly string username;
    private int coins;
    private readonly int countFriends;

    private Member(MemberId memberId, string username, int coins)
    {
        this.memberId = memberId;
        this.username = username;
        this.coins = coins;
    }

    private Member(MemberState memberState)
    {
        memberId = new MemberId(memberState.MemberId);
        username = memberState.Username;
        coins = memberState.Coins;
        countFriends = memberState.CountFriends;
    }

    public MemberId MemberId { get => memberId; }
    public MemberState Snapshot { get => new(memberId.Value, username, coins, countFriends); }

    public Friendship AddFriendship(Guid requesterId)
    {
        return Friendship.Create(memberId.Value, requesterId);
    }

    public Bet Bet(BetId betId,
                   string description,
                   int coins,
                   DateTime endDate,
                   IEnumerable<Guid> friends,
                   DateTime creationDate)
    {
        if (this.coins < coins)
            throw new CannotBetException(CannotBetException.CoinsNotEnough);

        if (!HasFriend())
            throw new CannotBetException(CannotBetException.NoneFriends);
        return Bets.Bet.Create(betId,
                               memberId,
                               description,
                               coins,
                               endDate,
                               friends,
                               creationDate);
    }

    public void DecreaseBalance(int coins)
    {
        this.coins -= coins;
    }

    private bool HasFriend()
    {
        return countFriends != 0;
    }

    internal bool CanBet(int coins)
        => this.coins >= coins;

    public void IncreaseBalance(int coins)
        => this.coins += coins;

    public static Member Create(MemberId memberId, string username)
    {
        return new Member(memberId, username, 2000);
    }

    public static Member FromState(MemberState memberState)
    {
        return new Member(memberState);
    }
}
