using MediatR;

namespace BetFriends.Application.Features.CompleteBet;

public record BetCompletedEventNotification(Guid BetId, bool IsSuccessful) : INotification;
