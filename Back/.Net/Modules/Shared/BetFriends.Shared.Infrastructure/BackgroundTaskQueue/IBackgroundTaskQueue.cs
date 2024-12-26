using BetFriends.Shared.Infrastructure.Inboxes;

namespace BetFriends.Shared.Infrastructure.BackgroundTaskQueue;

public interface IBackgroundTaskQueue
{
    Task<Inbox> DequeueAsync(CancellationToken stoppingToken);
    Task EnqueueAsync(Inbox integrationEvent);
}
