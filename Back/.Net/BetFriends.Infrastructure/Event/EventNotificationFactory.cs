using BetFriends.Application.Features.CompleteBet;
using BetFriends.Application.Features.CreateBet;
using BetFriends.Domain.Events;
using MediatR;
using System.Text.Json;

namespace BetFriends.Infrastructure.Event;

public class EventNotificationFactory
{
    public INotification Create(Outbox.Outbox outbox)
    {
        switch(outbox.Type)
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
