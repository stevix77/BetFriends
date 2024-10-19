using BetFriends.Application.Abstractions;
using BetFriends.Infrastructure.Event;
using BetFriends.Infrastructure.Outbox;
using MediatR;

namespace BetFriends.Api.HostedServices;

public class ProcessOutboxHostedService : BackgroundService
{
    private readonly ILogger<ProcessOutboxHostedService> logger;
    private readonly IOutboxRepository outboxRepository;
    private readonly EventNotificationFactory eventNotificationFactory;
    private readonly IMediator mediator;
    private readonly IDateProvider dateProvider;

    public ProcessOutboxHostedService(ILogger<ProcessOutboxHostedService> logger,
                                      IOutboxRepository outboxRepository,
                                      EventNotificationFactory eventNotificationFactory,
                                      IMediator mediator,
                                      IDateProvider dateProvider)
    {
        this.logger = logger;
        this.outboxRepository = outboxRepository;
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
                var outboxes = await outboxRepository.GetAllAsync();
                foreach (var item in outboxes)
                {
                    var notification = eventNotificationFactory.Create(item);
                    await mediator.Publish(notification, stoppingToken);
                    item.Handled(dateProvider);
                    await outboxRepository.SaveAsync(item);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.ToString());
            }
        }
    }
}
