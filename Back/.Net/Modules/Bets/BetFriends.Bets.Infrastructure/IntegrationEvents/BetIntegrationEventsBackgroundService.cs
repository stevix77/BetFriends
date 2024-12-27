using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.UserRegistered;
using BetFriends.Shared.Infrastructure.Inboxes;
using MediatR;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Nodes;

namespace BetFriends.Bets.Infrastructure.IntegrationEvents;

public class BetIntegrationEventsBackgroundService(BackgroundTaskQueue backgroundTaskQueue, IBetModule betModule) : BackgroundService
{
    private readonly BackgroundTaskQueue backgroundTaskQueue = backgroundTaskQueue;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var inbox = await backgroundTaskQueue.DequeueAsync(stoppingToken);
                if (inbox != null)
                {
                    var notification = BuildNotification(inbox);
                    await betModule.ExecuteNotificationAsync(notification);
                }
            }
            catch (Exception)
            {

            }
        }
    }

    private static INotification BuildNotification(Inbox inbox)
    {
        switch (inbox.Type)
        {
            case "userregisteredintegrationevent":
                var data = JsonNode.Parse(inbox.Data);
                return new UserRegisteredNotification(data["UserId"].GetValue<Guid>(),
                                                            data["Username"].GetValue<string>(),
                                                            data["Email"].GetValue<string>());
            default:
                return null!;
        }
    }
}
