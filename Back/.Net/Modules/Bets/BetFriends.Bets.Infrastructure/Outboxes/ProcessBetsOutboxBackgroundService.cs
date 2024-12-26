using BetFriends.Bets.Application.Abstractions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BetFriends.Bets.Infrastructure.Outboxes
{
    public sealed class ProcessBetsOutboxBackgroundService(IBetModule betModule,
                                                          ILogger logger) : BackgroundService
    {
        private readonly IBetModule betModule = betModule;
        private readonly ILogger logger = logger;

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await Task.Delay(5000, stoppingToken);
                    await betModule.ExecuteAsync(new ProcessOutboxCommand());
                }
                catch (Exception ex)
                {
                    logger.LogError(ex.ToString());
                }
            }
        }
    }
}
