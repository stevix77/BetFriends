using BetFriends.Domain;

namespace BetFriends.Infrastructure.Event;

internal class DomainEventsAccessor
{
    private readonly List<IDomainEvent> domainEvents = [];
    public IEnumerable<IDomainEvent> GetDomainEvents() => domainEvents;

    internal void Add(IReadOnlyCollection<IDomainEvent> events)
    {
        domainEvents.AddRange(events);
    }

    internal void ClearDomainEvents() => domainEvents.Clear();
}
