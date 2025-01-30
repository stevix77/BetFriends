using BetFriends.Bets.Infrastructure.IntegrationEvents;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Shared.Infrastructure.EventBus;
using BetFriends.Shared.Infrastructure.Outboxes;
using Microsoft.Extensions.Logging;

namespace BetFriends.Bets.Infrastructure.Outboxes;

public sealed class ProcessOutboxCommandHandler(IOutbox outboxAccessor,
                                                IEventBus eventBus,
                                                IDateProvider dateProvider,
                                                ILogger logger) : ICommandHandler<ProcessOutboxCommand>
{
    private readonly IOutbox outboxAccessor = outboxAccessor;
    private readonly IEventBus eventBus = eventBus;
    private readonly ILogger logger = logger;
    private readonly IDateProvider dateProvider = dateProvider;

    public async Task Handle(ProcessOutboxCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Bets - ProcessOutboxCommandHandler");
        var outboxes = await outboxAccessor.GetAllAsync();
        foreach (var item in outboxes)
        {
            var integrationEvent = IntegrationEventFactory.Create(item);
            if (integrationEvent != null)
                await eventBus.PublishAsync(integrationEvent);

            item.Handled(dateProvider);
            await outboxAccessor.SaveAsync(item);
        }
    }
}
