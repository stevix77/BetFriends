using BetFriends.Shared.Infrastructure.Inboxes;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.Register;
using MediatR;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Nodes;

namespace BetFriends.Users.Infrastructure.IntegrationEvents;

public class UserIntegrationEventsBackgroundService(BackgroundTaskQueue backgroundTaskQueue, IUserModule userModule) : BackgroundService
{
    private readonly BackgroundTaskQueue backgroundTaskQueue = backgroundTaskQueue;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            Inbox inbox = default!;
            try
            {
                inbox = await backgroundTaskQueue.DequeueAsync(stoppingToken);
                if (inbox != null)
                {
                    var notification = BuildNotification(inbox);
                    await userModule.ExecuteNotificationAsync(notification);
                }
            }
            catch (Exception)
            {
                await backgroundTaskQueue.EnqueueAsync(inbox);
            }
        }
    }

    private static INotification BuildNotification(Inbox inbox)
    {
        switch (inbox.Type)
        {
            case "userregisteredintegrationevent":
                var data = JsonNode.Parse(inbox.Data);
                return new UserRegisteredEventNotification(data["UserId"].GetValue<Guid>(),
                                                            data["Username"].GetValue<string>(),
                                                            data["Email"].GetValue<string>());
            default:
                return null!;
        }
    }
}
