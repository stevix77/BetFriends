using BetFriends.Bets.Domain.Bets;
using MediatR;

namespace BetFriends.Bets.Application.Features.CompleteBet;

public record BetCompletedNotification(BetId BetId, bool IsSuccessful) : INotification;
