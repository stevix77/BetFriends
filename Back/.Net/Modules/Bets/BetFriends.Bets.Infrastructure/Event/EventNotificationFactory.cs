using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.CreateBet;
using BetFriends.Bets.Domain.Events;
using BetFriends.Shared.Infrastructure.Outboxes;
using MediatR;
using System.Text.Json;

namespace BetFriends.Bets.Infrastructure.Event;

public class EventNotificationFactory
{
    public INotification Create(Outbox outbox)
    {
        switch (outbox.Type)
        {
            case nameof(BetCreated):
                var betCreated = JsonSerializer.Deserialize<BetCreated>(outbox.Data)!;
                return new BetCreatedEventNotification(betCreated.BetId, betCreated.OwnerId, betCreated.Coins);
            case nameof(BetCompleted):
                var betCompleted = JsonSerializer.Deserialize<BetCompleted>(outbox.Data)!;
                return new BetCompletedEventNotification(betCompleted.BetId.Value, betCompleted.IsSuccessful);
            default:
                return null!;
        }
    }
}
