using BetFriends.Shared.Application.Abstractions;

namespace BetFriends.Shared.Infrastructure.Outboxes;

public class Outbox
{
    public Outbox(Guid id, string type, string data, DateTime occurredOn)
    {
        Id = id;
        OccurredOn = occurredOn;
        Type = type;
        Data = data;
    }

    public Guid Id { get; }
    public DateTime OccurredOn { get; }
    public DateTime? ProcessedOn { get; private set; }
    public string Type { get; }
    public string Data { get; }

    public void Handled(IDateProvider dateProvider)
    {
        ProcessedOn = dateProvider.GetDate();
    }
}
