using BetFriends.Shared.Domain;

namespace BetFriends.Bets.Domain.Events;

public record FriendshipRequested(Guid RequesterId, Guid FriendId) : IDomainEvent;
