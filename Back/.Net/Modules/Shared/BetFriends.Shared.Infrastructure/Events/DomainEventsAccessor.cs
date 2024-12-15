using BetFriends.Shared.Domain;

namespace BetFriends.Shared.Infrastructure.Event;

public class DomainEventsAccessor
{
    private readonly List<IDomainEvent> domainEvents = [];
    public IEnumerable<IDomainEvent> GetDomainEvents() => domainEvents;

    public void Add(IReadOnlyCollection<IDomainEvent> events)
    {
        domainEvents.AddRange(events);
    }

    public void ClearDomainEvents() => domainEvents.Clear();
}
