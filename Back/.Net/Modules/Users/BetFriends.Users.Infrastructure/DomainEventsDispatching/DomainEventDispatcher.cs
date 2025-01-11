using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.Outboxes;
using MediatR;
using System.Text.Json;

namespace BetFriends.Users.Infrastructure.DomainEventsDispatching;

internal class DomainEventDispatcher(DomainEventsAccessor domainEventsAccessor,
                                    DomainEventNotificationFactory domainEventNotificationFactory,
                                    IMediator mediator,
                                    IOutbox outboxAccessor,
                                    IDateProvider dateProvider) : IDomainEventDispatcher
{
    public async Task DispatchAsync()
    {
        var domainEvents = domainEventsAccessor.GetDomainEvents().ToList();
        domainEventsAccessor.ClearDomainEvents();
        var domainEventTasks = new List<Task>();
        var outboxes = new List<Outbox>();
        foreach (var item in domainEvents)
        {
            var notification = domainEventNotificationFactory.Create(item);
            if (notification != null)
                domainEventTasks.Add(mediator.Publish(notification));

            var outbox = new Outbox(Guid.NewGuid(), item.GetType().Name, JsonSerializer.Serialize(item, item.GetType()), dateProvider.GetDate());
            outboxes.Add(outbox);
        }

        await Task.WhenAll(domainEventTasks);
        await Task.WhenAll(outboxes.Select(outboxAccessor.AddAsync));
    }
}
