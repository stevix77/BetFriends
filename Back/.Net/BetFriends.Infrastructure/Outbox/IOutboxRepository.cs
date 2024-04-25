
namespace BetFriends.Infrastructure.Outbox;

internal interface IOutboxRepository
{
    Task AddAsync(Outbox outbox);
}
