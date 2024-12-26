namespace BetFriends.Shared.Infrastructure.Inboxes;

public record Inbox(Guid Id, DateTime OccuredOn, string Type, string Data);
