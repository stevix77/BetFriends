using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;

namespace BetFriends.Bets.Application.UnitTests.Builders;

internal class BetBuilder
{
    private BetId betId;
    private MemberId bookieId;
    private int coins;

    internal BetBuilder WithId(BetId betId)
    {
        this.betId = betId;
        return this;
    }

    internal BetBuilder WithCoins(int coins)
    {
        this.coins = coins;
        return this;
    }

    internal Bet Build()
    {
        return Bet.Create(betId,
                          bookieId,
                          "description",
                          coins,
                          new DateTime(2024, 12, 26),
                          [],
                          new DateTime(2024, 11, 26));
    }

    internal BetBuilder WithBookie(MemberId bookieId)
    {
        this.bookieId = bookieId;
        return this;
    }
}
