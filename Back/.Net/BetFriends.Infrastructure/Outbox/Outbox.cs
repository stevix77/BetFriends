using BetFriends.Application.Abstractions;

namespace BetFriends.Infrastructure.Outbox
{
    public class Outbox
    {
        public Outbox(string type, string data, DateTime occurredOn)
        {
            Id = Guid.NewGuid();
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
}