using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using BetFriends.Shared.Domain;

namespace BetFriends.Domain.Events;

public record BetCreated(BetId BetId, MemberId OwnerId, int Coins) : IDomainEvent;
