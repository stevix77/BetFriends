using BetFriends.Domain.Bets;

namespace BetFriends.Domain.Events;

public sealed record BetCompleted(BetId BetId, bool IsSuccessful) : IDomainEvent;
