using BetFriends.Shared.Domain;
using MediatR;

namespace BetFriends.Users.Infrastructure.DomainEventsDispatching;

internal class DomainEventNotificationFactory
{
    public INotification Create(IDomainEvent domainEvent)
    {
        return domainEvent switch
        {

            _ => null!,
        };
    }
}
