using BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;

namespace BetFriends.Shared.Infrastructure.EventBus;

public interface IEventBus
{
    Task PublishAsync(IIntegrationEvent integrationEvent);
}
