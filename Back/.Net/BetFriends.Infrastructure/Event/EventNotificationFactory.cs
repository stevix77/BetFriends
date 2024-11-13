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
                var @event = JsonSerializer.Deserialize<BetCreated>(outbox.Data)!;
                return new BetCreatedEventNotification(@event.BetId, @event.OwnerId, @event.Coins);
            default:
                return null!;
        }
    }
}
