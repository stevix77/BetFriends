using BetFriends.Shared.Infrastructure.BackgroundTaskQueue;
using BetFriends.Shared.Infrastructure.Inboxes;
using System.Threading.Channels;

namespace BetFriends.Bets.Infrastructure.IntegrationEvents;

internal class BackgroundTaskQueue() : IBackgroundTaskQueue
{
    private readonly Channel<Inbox> queue = Channel.CreateBounded<Inbox>(new BoundedChannelOptions(100)
    {
        FullMode = BoundedChannelFullMode.Wait
    });

    public Task<Inbox> DequeueAsync(CancellationToken stoppingToken)
    {
        return queue.Reader.ReadAsync(stoppingToken).AsTask();
    }

    public Task EnqueueAsync(Inbox inbox)
    {
        return queue.Writer.WriteAsync(inbox).AsTask();
    }
}
