using BetFriends.Domain.Bets;
using BetFriends.Shared.Domain;

namespace BetFriends.Domain.Events;

public sealed record BetCompleted(BetId BetId, bool IsSuccessful) : IDomainEvent;
