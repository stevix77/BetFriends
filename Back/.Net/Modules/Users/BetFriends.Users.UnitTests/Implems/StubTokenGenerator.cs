using BetFriends.Users.Domain;

namespace BetFriends.Users.UnitTests.Implems;

internal class StubTokenGenerator : ITokenGenerator
{
    public string Generate(Guid userId)
    {
        return "refreshToken";
    }
}
