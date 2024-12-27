using MediatR;

namespace BetFriends.Users.Application.Features.Register;

public sealed class SendWelcomeMailNotificationHandler : INotificationHandler<UserRegisteredNotification>
{
    public Task Handle(UserRegisteredNotification notification, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}
