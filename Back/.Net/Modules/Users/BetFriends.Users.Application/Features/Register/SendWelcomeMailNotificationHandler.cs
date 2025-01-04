using MediatR;

namespace BetFriends.Users.Application.Features.Register;

public sealed class SendWelcomeMailNotificationHandler : INotificationHandler<UserRegisteredEventNotification>
{
    public Task Handle(UserRegisteredEventNotification notification, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}
