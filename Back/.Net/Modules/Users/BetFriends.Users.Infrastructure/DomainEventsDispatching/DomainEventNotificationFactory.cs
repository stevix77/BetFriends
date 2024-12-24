using BetFriends.Shared.Domain;
using BetFriends.Users.Domain.Users.Events;
using MediatR;

namespace BetFriends.Users.Infrastructure.DomainEventsDispatching;

internal class DomainEventNotificationFactory
{
    public INotification Create(IDomainEvent domainEvent)
    {
        return domainEvent switch
        {
            //UserRegistered ur => new BetCreatedNotification(bc.BetId, bc.OwnerId, bc.Coins)
            _ => null!,
        };
    }
}
