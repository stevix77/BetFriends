using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.UoW;

namespace BetFriends.Users.Infrastructure.UoW;

internal class InMemoryUnitOfWork : IUnitOfWork
{
    private readonly IDomainEventDispatcher _domainEventDispatcher;
    public InMemoryUnitOfWork(IDomainEventDispatcher domainEventDispatcher)
    {
        _domainEventDispatcher = domainEventDispatcher;
    }
    public Task Begin()
    {
        return Task.CompletedTask;
    }

    public async Task Commit()
    {
        await _domainEventDispatcher.DispatchAsync();
    }

    public Task Rollback()
    {
        return Task.CompletedTask;
    }
}
