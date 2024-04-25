using BetFriends.Application.Abstractions;
using BetFriends.Infrastructure.Outbox;
using MediatR;
using System.Text.Json;

namespace BetFriends.Infrastructure.Event;

internal class DomainEventDispatcher(DomainEventsAccessor domainEventsAccessor, 
                                    DomainEventNotificationFactory domainEventNotificationFactory, 
                                    IMediator mediator,
                                    IOutboxRepository outboxRepository,
                                    IDateProvider dateProvider) : IDomainEventDispatcher
{
    public async Task DispatchAsync()
    {
        var domainEvents = domainEventsAccessor.GetDomainEvents();
        var tasks = new List<Task>();
        foreach(var item in domainEvents)
        {
            var notification = domainEventNotificationFactory.Create(item);
            if(notification != null)
                tasks.Add(mediator.Send(notification));
        }

        domainEventsAccessor.ClearDomainEvents();
        await Task.WhenAll(tasks);

        foreach(var item in domainEvents)
        {
            var outbox = new Outbox.Outbox(item.GetType().Name, JsonSerializer.Serialize(item), dateProvider.GetDate());
            await outboxRepository.AddAsync(outbox);
        }
    }
}
