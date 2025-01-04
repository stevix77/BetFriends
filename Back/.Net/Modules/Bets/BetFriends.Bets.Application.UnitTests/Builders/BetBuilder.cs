using BetFriends.Bets.Domain.Bets;

namespace BetFriends.Bets.Application.UnitTests.Builders;

internal class BetBuilder
{
    private Guid betId;
    private Guid bookieId;
    private int coins;

    internal BetBuilder WithId(Guid betId)
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
        return Bet.Create(new BetId(betId),
                          new Domain.Members.MemberId(bookieId),
                          "description",
                          coins,
                          new DateTime(2024, 12, 26),
                          [],
                          new DateTime(2024, 11, 26));
    }

    internal BetBuilder WithBookie(Guid bookieId)
    {
        this.bookieId = bookieId;
        return this;
    }
}
