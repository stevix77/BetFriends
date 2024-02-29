using BetFriends.Application.Abstractions;

namespace BetFriends.Application.UnitTests.Implems;

internal class StubUserContext : IUserContext
{
    private Guid guid;

    public StubUserContext(Guid guid)
    {
        this.guid = guid;
    }

    public Guid UserId => guid;
}
