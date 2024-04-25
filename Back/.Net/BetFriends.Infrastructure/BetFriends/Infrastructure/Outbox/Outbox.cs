namespace BetFriends.Infrastructure.Outbox
{
    internal class Outbox
    {
        public Outbox(string type, string data, DateTime occurredOn)
        {
            Id = Guid.NewGuid();
            OccurredOn = occurredOn;
            Type = type;
            Data = data;
        }

        public Guid Id { get; set; }
        public DateTime OccurredOn { get; set; }
        public string Type { get; }
        public string Data { get; }
    }
}