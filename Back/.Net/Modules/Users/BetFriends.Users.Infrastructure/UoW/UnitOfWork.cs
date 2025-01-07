using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.UoW;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;

namespace BetFriends.Users.Infrastructure.UoW;

internal class UnitOfWork(UserContext userContext, IDomainEventDispatcher domainEventDispatcher) : IUnitOfWork
{
    private readonly UserContext userContext = userContext;
    private readonly IDomainEventDispatcher domainEventDispatcher = domainEventDispatcher;

    public Task Begin()
    {
        return userContext.Database.BeginTransactionAsync();
    }

    public async Task Commit()
    {
        await domainEventDispatcher.DispatchAsync();
        await userContext.SaveChangesAsync();
        await userContext.Database.CommitTransactionAsync();
    }

    public Task Rollback()
    {
        return userContext.Database.RollbackTransactionAsync();
    }
}
