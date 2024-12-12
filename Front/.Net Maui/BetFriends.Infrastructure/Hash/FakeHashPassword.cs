using BetFriends.Domain.Abstractions;

namespace BetFriends.Infrastructure.Hash;

internal class FakeHashPassword : IHashPassword
{
    public string Hash(string password)
    {
        return $"hashed{password}";
    }
}
