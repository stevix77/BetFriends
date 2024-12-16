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

    public Member(MemberId memberId, string username, int coins, int countFriends)
    {
        this.memberId = memberId;
        this.username = username;
        this.coins = coins;
        this.countFriends = countFriends;
    }

    public MemberId MemberId { get => memberId; }
    public int Coins { get => coins; }

    public string Username { get => username; }

    public Friendship AddFriendship(Guid requesterId)
    {
        return Friendship.Create(memberId.Value, requesterId);
    }

    public Bet Bet(BetId betId,
                   string description,
                   int chips,
                   DateTime endDate,
                   IEnumerable<Guid> friends,
                   DateTime creationDate)
    {
        if (this.coins < chips)
            throw new CannotBetException(CannotBetException.ChipsNotEnough);

        if (!HasFriend())
            throw new CannotBetException(CannotBetException.NoneFriends);
        return Bets.Bet.Create(betId,
                               memberId,
                               description,
                               chips,
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
        => Coins >= coins;

    public void IncreaseBalance(int coins)
        => this.coins += coins;
}
