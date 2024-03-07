namespace BetFriends.Domain.Events;

public record FriendshipRequested(Guid RequesterId, Guid FriendId) : IDomainEvent;
