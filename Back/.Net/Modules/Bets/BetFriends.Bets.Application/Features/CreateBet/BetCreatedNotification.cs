using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;
using MediatR;

namespace BetFriends.Bets.Application.Features.CreateBet;

public record BetCreatedNotification(BetId BetId, MemberId OwnerId, int Coins) : INotification;