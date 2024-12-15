
namespace BetFriends.Shared.Infrastructure.Event;

public interface IDomainEventDispatcher
{
    Task DispatchAsync();
}
