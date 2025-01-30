using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.UoW;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.Data.SqlClient;

namespace BetFriends.Users.Infrastructure.UoW;

public class UnitOfWork(UserContext userContext,
                          IDomainEventDispatcher domainEventDispatcher) : IUnitOfWork
{
    private readonly UserContext userContext = userContext;
    private readonly IDomainEventDispatcher domainEventDispatcher = domainEventDispatcher;

    public async Task Begin()
    {
        await userContext.Database.BeginTransactionAsync();
    }

    public async Task Commit()
    {
        await domainEventDispatcher.DispatchAsync();
        await userContext.SaveChangesAsync();
        await userContext.Database.CommitTransactionAsync();
    }

    public async Task Rollback()
    {
        await userContext.Database.RollbackTransactionAsync();
    }
}
