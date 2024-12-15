using BetFriends.Users.Application.Abstractions;

namespace BetFriends.Users.Infrastructure.Hash;

internal class FakeHashPassword : IHashPassword
{
    public string Hash(string password)
        => $"hashed{password}";
}
