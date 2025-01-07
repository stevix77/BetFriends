using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.UoW;

namespace BetFriends.Bets.Infrastructure.UoW;

internal class UnitOfWork(BetContext betContext, IDomainEventDispatcher domainEventDispatcher) : IUnitOfWork
{
    private readonly BetContext betContext = betContext;
    private readonly IDomainEventDispatcher domainEventDispatcher = domainEventDispatcher;

    public Task Begin()
    {
        return betContext.Database.BeginTransactionAsync();
    }

    public async Task Commit()
    {
        await domainEventDispatcher.DispatchAsync();
        await betContext.SaveChangesAsync();
        await betContext.Database.CommitTransactionAsync();
    }

    public Task Rollback()
    {
        return betContext.Database.RollbackTransactionAsync();
    }
}
