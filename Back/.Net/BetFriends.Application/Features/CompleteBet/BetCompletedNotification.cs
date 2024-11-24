using BetFriends.Domain.Bets;
using MediatR;

namespace BetFriends.Application.Features.CompleteBet;

public record BetCompletedNotification(BetId BetId, bool IsSuccessful) : INotification;
