using BetFriends.Users.Application.Abstractions;

namespace BetFriends.Users.UnitTests.Implems;

internal class MockPasswordHasher : IHashPassword
{
    public MockPasswordHasher()
    {
    }

    public string Hash(string password)
        => $"hashed{password}";
}
