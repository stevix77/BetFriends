using MediatR;

namespace BetFriends.Bets.Application.Features.UserRegistered;

public record UserRegisteredNotification(Guid UserId, string Username, string Email) : INotification;