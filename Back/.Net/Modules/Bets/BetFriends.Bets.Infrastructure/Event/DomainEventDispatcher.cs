﻿using BetFriends.Bets.Infrastructure.Outbox;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure.Event;
using MediatR;
using System.Text.Json;

namespace BetFriends.Bets.Infrastructure.Event;

internal class DomainEventDispatcher(DomainEventsAccessor domainEventsAccessor,
                                    DomainEventNotificationFactory domainEventNotificationFactory,
                                    IMediator mediator,
                                    IOutboxRepository outboxRepository,
                                    IDateProvider dateProvider) : IDomainEventDispatcher
{
    public async Task DispatchAsync()
    {
        var domainEvents = domainEventsAccessor.GetDomainEvents();
        var domainEventTasks = new List<Task>();
        var outboxes = new List<Outbox.Outbox>();
        foreach (var item in domainEvents)
        {
            var notification = domainEventNotificationFactory.Create(item);
            if (notification != null)
            {
                domainEventTasks.Add(mediator.Publish(notification));

                var outbox = new Outbox.Outbox(item.GetType().Name, JsonSerializer.Serialize(item, item.GetType()), dateProvider.GetDate());
                outboxes.Add(outbox);
            }
        }

        domainEventsAccessor.ClearDomainEvents();
        await Task.WhenAll(domainEventTasks);
        await Task.WhenAll(outboxes.Select(outboxRepository.AddAsync));
    }
}
