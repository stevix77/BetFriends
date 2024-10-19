using BetFriends.Domain.Abstractions;

namespace BetFriends.Domain.UnitTests.Implems;

internal class StubIdGenerator : IIdGenerator
{
    private string id;

    public StubIdGenerator(string id)
    {
        this.id = id;
    }

    public string Id { get => id; }

    public string Generate()
        => id;
}
