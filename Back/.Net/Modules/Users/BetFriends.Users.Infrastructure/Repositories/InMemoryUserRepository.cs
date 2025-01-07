using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Users.Domain.Users;

namespace BetFriends.Users.Infrastructure.Repositories;

internal class InMemoryUserRepository(DomainEventsAccessor domainEventsAccessor) : IUserRepository
{
    private readonly List<User> users = [];
    public Task<bool> IsUserExistAsync(string username, string email)
    {
        if(users.Any(x => x.Snapshot.Username == username || x.Snapshot.Email == email))
            return Task.FromResult(true);
        return Task.FromResult(false);
    }

    public Task SaveAsync(User user)
    {
        users.Add(user);
        domainEventsAccessor.Add(user.Events);
        return Task.CompletedTask;
    }

    internal User GetUser(string email, string password)
    {
        return users.Find(x => x.Snapshot.Email == email && x.Snapshot.Password == password)!;
    }
}
