using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Outboxes;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Bets.Infrastructure.Outboxes;

public class SqlOutboxAccessor(BetContext betContext) : IOutbox
{
    private readonly BetContext betContext = betContext;

    public Task AddAsync(Outbox outbox)
    {
        var entity = new OutboxEntity(outbox);
        return betContext.Outboxes.AddAsync(entity).AsTask();
    }

    public async Task<IEnumerable<Outbox>> GetAllAsync()
    {
        var entities = await betContext.Outboxes.Where(x => !x.ProcessedOn.HasValue).ToListAsync();
        return entities.Select(x => new Outbox(x.Id, x.Type, x.Data, x.OccurredOn));
    }

    public OutboxEntity? GetEntity(Guid id)
    {
        var entity = betContext.Outboxes.Find(id);
        return entity;
    }

    public async Task SaveAsync(Outbox item)
    {
        var entity = await betContext.Outboxes.FindAsync(item.Id);
        if (entity == null)
            return;
        entity.ProcessedOn = item.ProcessedOn;
    }
}