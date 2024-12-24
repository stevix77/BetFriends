using BetFriends.Users.Domain.Users;

namespace BetFriends.Users.Infrastructure.Repositories;

internal class InMemoryUserRepository : IUserRepository
{
    private readonly List<User> users = [];
    public Task<bool> IsUserExistAsync(string username, string email)
    {
        if(users.Any(x => x.State.Username == username || x.State.Email == email))
            return Task.FromResult(true);
        return Task.FromResult(false);
    }

    public Task SaveAsync(User user)
    {
        users.Add(user);
        return Task.CompletedTask;
    }

    internal User GetUser(string email, string password)
    {
        throw new NotImplementedException();
    }
}
