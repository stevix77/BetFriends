using BetFriends.Bets.Domain.Bets;
using BetFriends.Shared.Domain;

namespace BetFriends.Bets.Domain.Events;

public sealed record BetCompleted(BetId BetId, bool IsSuccessful) : IDomainEvent;
