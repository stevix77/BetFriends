using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Users.Infrastructure.Outboxes;

public class SqlOutboxAccessor(UserContext userContext) : IOutbox
{
    private readonly UserContext userContext = userContext;

    public Task AddAsync(Outbox outbox)
    {
        var entity = new OutboxEntity(outbox);
        return userContext.Outboxes.AddAsync(entity).AsTask();
    }

    public async Task<IEnumerable<Outbox>> GetAllAsync()
    {
        var query = await userContext.Outboxes.Where(x => x.ProcessedOn == null).ToListAsync();
        return query.Select(outbox => new Outbox(outbox.Id, outbox.Type, outbox.Data, outbox.OccurredOn));
    }

    public async Task SaveAsync(Outbox item)
    {
        var entity = await userContext.Outboxes.FindAsync(item.Id);
        if (entity == null)
            return;
        entity.ProcessedOn = item.ProcessedOn;
    }
}

public class OutboxQuery
{
    public Guid Id { get; init; }
    public string Type { get; init; }
    public string Data { get; init; }
    public DateTime OccuredOn { get; init; }
}
