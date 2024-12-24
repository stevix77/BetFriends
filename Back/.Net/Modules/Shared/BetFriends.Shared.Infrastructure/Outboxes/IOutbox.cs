namespace BetFriends.Shared.Infrastructure.Outboxes;

public interface IOutbox
{
    Task AddAsync(Outbox outbox);
    Task<IEnumerable<Outbox>> GetAllAsync();
    Task SaveAsync(Outbox item);
}
