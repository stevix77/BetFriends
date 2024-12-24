using BetFriends.Users.Domain;

namespace BetFriends.Users.Infrastructure.TokenGenerators;

internal class FakeTokenGenerator : ITokenGenerator
{
    public string Generate(Guid userId)
        => $"refreshToken{userId.ToString()}";
}
