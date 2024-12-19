using BetFriends.Domain.Abstractions;

namespace BetFriends.Domain.UnitTests.Implems;

internal class MockUserGateway : IUserGateway
{
    public User? User { get; internal set; }

    public Task SaveAsync(User user)
    {
        User = user;
        return Task.CompletedTask;
    }
}
