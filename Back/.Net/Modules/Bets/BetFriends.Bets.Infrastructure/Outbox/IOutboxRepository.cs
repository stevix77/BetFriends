namespace BetFriends.Bets.Infrastructure.Outbox;

public interface IOutboxRepository
{
    Task AddAsync(Outbox outbox);
    Task<IEnumerable<Outbox>> GetAllAsync();
    Task SaveAsync(Outbox item);
}
