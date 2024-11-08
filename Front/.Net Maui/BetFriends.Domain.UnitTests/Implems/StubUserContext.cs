using BetFriends.Domain.Abstractions;

namespace BetFriends.Domain.UnitTests.Implems;

internal class StubUserContext(string userId) : IUserContext
{
    public string UserId { get => userId; }
}
