using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.CreateBet;
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
            Inbox inbox = default!;
            try
            {
                inbox = await backgroundTaskQueue.DequeueAsync(stoppingToken);
                if (inbox != null)
                {
                    var notification = BuildNotification(inbox);
                    await betModule.ExecuteNotificationAsync(notification);
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
                var userRegisteredEvent = JsonNode.Parse(inbox.Data);
                return new UserRegisteredNotification(userRegisteredEvent["UserId"].GetValue<Guid>(),
                                                            userRegisteredEvent["Username"].GetValue<string>(),
                                                            userRegisteredEvent["Email"].GetValue<string>());
            case "betcreatedintegrationevent":
                var betCreatedEvent = JsonNode.Parse(inbox.Data);
                return new BetCreatedEventNotification(betCreatedEvent["BetId"].GetValue<Guid>(),
                                                            betCreatedEvent["BettorId"].GetValue<Guid>(),
                                                            betCreatedEvent["Coins"].GetValue<int>());
            case "betcompletedintegrationevent":
                var betCompletedEvent = JsonNode.Parse(inbox.Data);
                return new BetCompletedEventNotification(betCompletedEvent["BetId"].GetValue<Guid>(),
                                                            betCompletedEvent["IsSuccessfu"].GetValue<bool>());
            default:
                return null!;
        }
    }
}
