using BetFriends.Domain.Abstractions;

namespace BetFriends.Infrastructure.Gateways;

internal class InMemoryUserGateway : IUserGateway
{
    private readonly List<User> users = [];
    internal IEnumerable<User> Users { get =>  users; }

    public Task SaveAsync(User user)
    {
        users.Add(user);
        return Task.CompletedTask;
    }
}
