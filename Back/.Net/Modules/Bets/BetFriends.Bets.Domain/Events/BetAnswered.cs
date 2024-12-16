using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;
using BetFriends.Shared.Domain;

namespace BetFriends.Bets.Domain.Events;

public record BetAnswered(BetId BetId, bool Answer, MemberId MemberId) : IDomainEvent;