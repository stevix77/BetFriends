namespace BetFriends.Domain;

public abstract class Entity
{
    private List<IDomainEvent> events;
    public IReadOnlyCollection<IDomainEvent> Events { get => events.AsReadOnly(); }

    public Entity()
    {
        events = new List<IDomainEvent>();
    }

    protected void AddEvent(IDomainEvent @event)
    {
        events.Add(@event);
    }
}
