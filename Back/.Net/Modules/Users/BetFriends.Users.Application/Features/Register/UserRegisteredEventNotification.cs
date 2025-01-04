using MediatR;

namespace BetFriends.Users.Application.Features.Register;

public record UserRegisteredEventNotification(Guid UserId, string Username, string Email) : INotification;
