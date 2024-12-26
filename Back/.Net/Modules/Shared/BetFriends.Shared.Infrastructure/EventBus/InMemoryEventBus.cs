using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure.BackgroundTaskQueue;
using BetFriends.Shared.Infrastructure.Inboxes;
using BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;
using System.Text.Json;

namespace BetFriends.Shared.Infrastructure.EventBus;

public class InMemoryEventBus(IEnumerable<IBackgroundTaskQueue> backgroundTaskQueues,
                                IDateProvider dateProvider) : IEventBus
{
    public Task PublishAsync(IIntegrationEvent integrationEvent)
    {
        var inbox = new Inbox(Guid.NewGuid(), dateProvider.GetDate(), integrationEvent.GetType().Name.ToLower(), JsonSerializer.Serialize(integrationEvent));
        return Task.WhenAll(backgroundTaskQueues.Select(x => x.EnqueueAsync(inbox)));
    }

}
