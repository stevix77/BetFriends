using MediatR;

namespace BetFriends.Users.Application.Features.Register;

public record UserRegisteredNotification(Guid UserId, string Username, string Email) : INotification;
