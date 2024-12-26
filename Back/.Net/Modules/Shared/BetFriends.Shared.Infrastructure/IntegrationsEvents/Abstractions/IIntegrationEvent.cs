namespace BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;

public interface IIntegrationEvent
{
}

public interface IIntegrationEventHandler<T> : IIntegrationEventHandler where T : IIntegrationEvent
{
    Task HandleAsync(T integrationEvent);
}

public interface IIntegrationEventHandler
{
}