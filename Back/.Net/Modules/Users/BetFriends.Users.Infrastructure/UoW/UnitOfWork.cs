using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.UoW;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace BetFriends.Users.Infrastructure.UoW;

internal class UnitOfWork(UserContext userContext,
                          IDomainEventDispatcher domainEventDispatcher) : IUnitOfWork
{
    private readonly UserContext userContext = userContext;
    //private readonly SqlTransaction sqlTransaction = sqlTransaction;
    private readonly IDomainEventDispatcher domainEventDispatcher = domainEventDispatcher;

    public async Task Begin()
    {
        await userContext.Database.BeginTransactionAsync(System.Data.IsolationLevel.ReadUncommitted);
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
