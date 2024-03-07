
namespace BetFriends.Infrastructure.Event;

internal interface IDomainEventDispatcher
{
    Task DispatchAsync();
}
