using MediatR;

namespace BetFriends.Bets.Application.Features.CreateBet;

public record BetCreatedEventNotification(Guid BetId, Guid BettorId, int Coins) : INotification;
