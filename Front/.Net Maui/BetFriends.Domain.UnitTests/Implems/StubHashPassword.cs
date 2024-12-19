using BetFriends.Domain.Abstractions;

namespace BetFriends.Domain.UnitTests.Implems;

internal class StubHashPassword(string hash) : IHashPassword
{
    public string Hash(string password)
        => $"{hash}{password}";
}
