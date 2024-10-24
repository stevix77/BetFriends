using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;

namespace BetFriends.Domain.Events;

public record BetCreated(BetId BetId, MemberId OwnerId, int Chips) : IDomainEvent;
