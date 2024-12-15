using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Shared.Application.UnitTests.Implems;

internal class StubIdGenerator : IIdGenerator
{
    public StubIdGenerator(Guid id)
    {
        this.id = id;
    }

    private Guid id;

    public Guid Generate() => id;
}
