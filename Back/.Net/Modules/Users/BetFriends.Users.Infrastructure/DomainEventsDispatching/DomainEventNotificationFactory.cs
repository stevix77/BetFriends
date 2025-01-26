using BetFriends.Shared.Domain;
using MediatR;

namespace BetFriends.Users.Infrastructure.DomainEventsDispatching;

internal static class DomainEventNotificationFactory
{
    public static INotification Create(IDomainEvent domainEvent)
    {
        return domainEvent switch
        {

            _ => null!,
        };
    }
}
