using BetFriends.Infrastructure.Outbox;

namespace BetFriends.Infrastructure.Repositories;

internal class FakeOutboxInMemoryRepository : IOutboxRepository
{
    private readonly List<Outbox.Outbox> outboxes = [];

    public Task AddAsync(Outbox.Outbox outbox)
    {
        outboxes.Add(outbox);
        return Task.CompletedTask;
    }

    public Task<IEnumerable<Outbox.Outbox>> GetAllAsync() 
        => Task.FromResult<IEnumerable<Outbox.Outbox>>(outboxes.Where(x => x.ProcessedOn is null));

    public Task SaveAsync(Outbox.Outbox outbox)
    {
        return Task.CompletedTask;
    }
}
