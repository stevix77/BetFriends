
namespace BetFriends.Infrastructure.Event;

internal class DomainEventDispatcher(DomainEventsAccessor domainEventsAccessor) : IDomainEventDispatcher
{
    public Task DispatchAsync()
    {
        var domainEvents = domainEventsAccessor.GetDomainEvents();
        return Task.CompletedTask;
    }
}
