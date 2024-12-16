using BetFriends.Bets.Infrastructure.Outbox;

namespace BetFriends.Bets.Infrastructure.Repositories;

public class FakeOutboxInMemoryRepository : IOutboxRepository
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
