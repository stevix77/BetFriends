using BetFriends.Users.Domain.Users;

namespace BetFriends.Users.UnitTests.Implems;

internal class MockUserRepository(User user = null!) : IUserRepository
{
    public User User { get; private set; } = user;

    public Task<bool> IsUserExistAsync(string username, string email)
    {
        if(User != null)
            return Task.FromResult(true);
        return Task.FromResult(false);
    }

    public Task SaveAsync(User user)
    {
        User = user;
        return Task.CompletedTask;
    }
}