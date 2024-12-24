using BetFriends.Shared.Infrastructure.Outboxes;

namespace BetFriends.Bets.Infrastructure.Outboxes;

public class InMemoryOutboxAccessor : IOutbox
{
    private readonly List<Outbox> outboxes = [];

    public Task AddAsync(Outbox outbox)
    {
        outboxes.Add(outbox);
        return Task.CompletedTask;
    }

    public Task<IEnumerable<Outbox>> GetAllAsync()
        => Task.FromResult(outboxes.Where(x => x.ProcessedOn is null));

    public Task SaveAsync(Outbox outbox)
    {
        return Task.CompletedTask;
    }
}
