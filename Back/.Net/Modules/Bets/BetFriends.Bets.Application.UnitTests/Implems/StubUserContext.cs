using BetFriends.Bets.Application.Abstractions;

namespace BetFriends.Bets.Application.UnitTests.Implems;

internal class StubUserContext : IUserContext
{
    private Guid userId;

    public StubUserContext(Guid userId)
    {
        this.userId = userId;
    }

    public Guid UserId => userId;
}
