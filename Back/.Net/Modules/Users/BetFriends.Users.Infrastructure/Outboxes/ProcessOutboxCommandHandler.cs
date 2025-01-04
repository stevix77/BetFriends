using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Shared.Infrastructure.EventBus;
using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Users.Infrastructure.IntegrationEvents;
using Microsoft.Extensions.Logging;

namespace BetFriends.Users.Infrastructure.Outboxes;


public sealed class ProcessOutboxCommandHandler(ILogger logger,
                                                IOutbox outboxAccessor,
                                                IntegrationEventFactory integrationEventFactory,
                                                IDateProvider dateProvider,
                                                IEventBus eventBus) : ICommandHandler<ProcessOutboxCommand>
{
    private readonly ILogger logger = logger;
    private readonly IOutbox outboxAccessor = outboxAccessor;
    private readonly IntegrationEventFactory integrationEventFactory = integrationEventFactory;
    private readonly IDateProvider dateProvider = dateProvider;
    private readonly IEventBus eventBus = eventBus;

    public async Task Handle(ProcessOutboxCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Users - ProcessOutboxCommandHandler");
        var outboxes = await outboxAccessor.GetAllAsync();
        foreach (var item in outboxes)
        {
            var integrationEvent = integrationEventFactory.Create(item);
            if (integrationEvent != null)
                await eventBus.PublishAsync(integrationEvent);

            item.Handled(dateProvider);
            await outboxAccessor.SaveAsync(item);
        }
    }
}
