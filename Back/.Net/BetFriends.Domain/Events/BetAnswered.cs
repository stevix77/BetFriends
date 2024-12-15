using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using BetFriends.Shared.Domain;

namespace BetFriends.Domain.Events;

public record BetAnswered(BetId BetId, bool Answer, MemberId MemberId) : IDomainEvent;