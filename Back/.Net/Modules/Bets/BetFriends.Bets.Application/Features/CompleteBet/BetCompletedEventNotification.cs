using MediatR;

namespace BetFriends.Bets.Application.Features.CompleteBet;

public record BetCompletedEventNotification(Guid BetId, bool IsSuccessful) : INotification;
