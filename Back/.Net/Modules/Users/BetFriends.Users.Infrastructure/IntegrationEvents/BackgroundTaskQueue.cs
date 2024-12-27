using BetFriends.Shared.Infrastructure.BackgroundTaskQueue;
using BetFriends.Shared.Infrastructure.Inboxes;
using System.Threading.Channels;

namespace BetFriends.Users.Infrastructure.IntegrationEvents;

public class BackgroundTaskQueue() : IBackgroundTaskQueue
{
    private readonly Channel<Inbox> queue = Channel.CreateBounded<Inbox>(new BoundedChannelOptions(100)
    {
        FullMode = BoundedChannelFullMode.Wait
    });

    public async Task<Inbox> DequeueAsync(CancellationToken stoppingToken)
    {
        return await queue.Reader.ReadAsync(stoppingToken);
    }

    public async Task EnqueueAsync(Inbox inbox)
    {
        await queue.Writer.WriteAsync(inbox);
    }
}
