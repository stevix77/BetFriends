using BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;
using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Users.Domain.Users.Events;
using System.Text.Json;

namespace BetFriends.Users.Infrastructure.IntegrationEvents;

public static class IntegrationEventFactory
{
    public static IIntegrationEvent Create(Outbox outbox)
    {
        switch (outbox.Type)
        {
            case nameof(UserRegistered):
                var userRegistered = JsonSerializer.Deserialize<UserRegistered>(outbox.Data)!;
                return new UserRegisteredIntegrationEvent(userRegistered.UserId.Value, userRegistered.Username, userRegistered.Email);
            default:
                return null!;
        }
    }
}
