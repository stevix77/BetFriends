using BetFriends.Bets.Infrastructure.Event;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure.Outboxes;
using MediatR;

namespace BetFriends.Api.HostedServices;

public class ProcessOutboxHostedService : BackgroundService
{
    private readonly ILogger<ProcessOutboxHostedService> logger;
    private readonly IOutbox outboxAccessor;
    private readonly EventNotificationFactory eventNotificationFactory;
    private readonly IMediator mediator;
    private readonly IDateProvider dateProvider;

    public ProcessOutboxHostedService(ILogger<ProcessOutboxHostedService> logger,
                                      IOutbox outboxAccessor,
                                      EventNotificationFactory eventNotificationFactory,
                                      IMediator mediator,
                                      IDateProvider dateProvider)
    {
        this.logger = logger;
        this.outboxAccessor = outboxAccessor;
        this.eventNotificationFactory = eventNotificationFactory;
        this.mediator = mediator;
        this.dateProvider = dateProvider;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(5000, stoppingToken);
                var outboxes = await outboxAccessor.GetAllAsync();
                foreach (var item in outboxes)
                {
                    var notification = eventNotificationFactory.Create(item);
                    await mediator.Publish(notification, stoppingToken);
                    item.Handled(dateProvider);
                    await outboxAccessor.SaveAsync(item);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.ToString());
            }
        }
    }
}
