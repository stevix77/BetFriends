namespace BetFriends.Domain;

public abstract class Entity
{
    private readonly List<IDomainEvent> events;
    public IReadOnlyCollection<IDomainEvent> Events { get => events.AsReadOnly(); }

    public Entity()
    {
        events = [];
    }

    protected void AddEvent(IDomainEvent @event)
    {
        events.Add(@event);
    }
}
