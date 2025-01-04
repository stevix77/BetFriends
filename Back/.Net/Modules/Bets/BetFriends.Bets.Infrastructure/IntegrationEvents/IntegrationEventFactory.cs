using BetFriends.Bets.Domain.Events;
using BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;
using BetFriends.Shared.Infrastructure.Outboxes;
using System.Text.Json;

namespace BetFriends.Bets.Infrastructure.IntegrationEvents;

public class IntegrationEventFactory
{
    public IIntegrationEvent Create(Outbox outbox)
    {
        switch (outbox.Type)
        {
            case nameof(BetCreated):
                var betCreated = JsonSerializer.Deserialize<BetCreated>(outbox.Data)!;
                return new BetCreatedIntegrationEvent(betCreated.BetId.Value, betCreated.OwnerId.Value, betCreated.Coins);
            case nameof(BetCompleted):
                var betCompleted = JsonSerializer.Deserialize<BetCompleted>(outbox.Data)!;
                return new BetCompletedIntegrationEvent(betCompleted.BetId.Value, betCompleted.IsSuccessful);
            default:
                return null!;
        }
    }
}
