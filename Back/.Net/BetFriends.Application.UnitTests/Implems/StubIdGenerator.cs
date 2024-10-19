using BetFriends.Application.Abstractions;

namespace BetFriends.Application.UnitTests.Implems;

internal class StubIdGenerator : IIdGenerator
{
    public StubIdGenerator(Guid id)
    {
        this.id = id;
    }

    private Guid id;

    public Guid Generate() => id;
}
