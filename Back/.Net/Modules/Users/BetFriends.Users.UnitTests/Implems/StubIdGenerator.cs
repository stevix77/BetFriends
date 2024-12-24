using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Users.UnitTests.Implems;

internal class StubIdGenerator : IIdGenerator
{
    private readonly Guid id;

    public StubIdGenerator(Guid id)
    {
        this.id = id;
    }

    public Guid Generate()
        => id;
}