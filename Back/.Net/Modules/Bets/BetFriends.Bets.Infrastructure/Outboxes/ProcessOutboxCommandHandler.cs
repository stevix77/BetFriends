using BetFriends.Bets.Infrastructure.Event;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Shared.Infrastructure.Outboxes;
using MediatR;
using Microsoft.Extensions.Logging;

namespace BetFriends.Bets.Infrastructure.Outboxes;

public sealed class ProcessOutboxCommandHandler(IOutbox outboxAccessor,
                                                EventNotificationFactory eventNotificationFactory,
                                                IMediator mediator,
                                                IDateProvider dateProvider,
                                                ILogger logger) : ICommandHandler<ProcessOutboxCommand>
{
    private readonly IOutbox outboxAccessor = outboxAccessor;
    private readonly EventNotificationFactory eventNotificationFactory = eventNotificationFactory;
    private readonly IMediator mediator = mediator;
    private readonly ILogger logger = logger;
    private readonly IDateProvider dateProvider = dateProvider;

    public async Task Handle(ProcessOutboxCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Bets - ProcessOutboxCommandHandler");
        var outboxes = await outboxAccessor.GetAllAsync();
        foreach (var item in outboxes)
        {
            var notification = eventNotificationFactory.Create(item);
            await mediator.Publish(notification, cancellationToken);
            item.Handled(dateProvider);
            await outboxAccessor.SaveAsync(item);
        }
    }
}
