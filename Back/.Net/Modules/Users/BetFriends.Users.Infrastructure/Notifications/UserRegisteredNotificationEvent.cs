using MediatR;

namespace BetFriends.Users.Infrastructure.Notifications;

internal record UserRegisteredNotificationEvent(Guid UserId, string Username, string Email) : INotification;
