using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;
using BetFriends.Shared.Domain;

namespace BetFriends.Bets.Domain.Events;

public record BetCreated(BetId BetId, MemberId OwnerId, int Coins) : IDomainEvent;
