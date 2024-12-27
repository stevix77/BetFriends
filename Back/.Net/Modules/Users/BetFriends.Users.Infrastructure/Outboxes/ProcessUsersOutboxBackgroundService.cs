using BetFriends.Users.Application.Abstractions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BetFriends.Users.Infrastructure.Outboxes;

public class ProcessUsersOutboxBackgroundService(IUserModule userModule,
                                        ILogger logger) : BackgroundService
{
    private readonly ILogger logger = logger;
    private readonly IUserModule userModule = userModule;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(5000, stoppingToken);
                await userModule.ExecuteAsync(new ProcessOutboxCommand());
            }
            catch (Exception ex)
            {
                logger.LogError(ex.ToString());
            }
        }
    }
}
