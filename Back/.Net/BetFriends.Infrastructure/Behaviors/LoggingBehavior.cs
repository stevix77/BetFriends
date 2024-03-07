using MediatR;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Reflection;
using System.Text;

namespace BetFriends.Infrastructure.Behaviors;

internal class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    {
        this.logger = logger;
    }
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var watch = new Stopwatch();
        watch.Start();
        try
        {
            logger.LogInformation($"Handling {request!.GetType().Name}");
            IList<PropertyInfo> props = new List<PropertyInfo>(request!.GetType().GetProperties());
            var builder = new StringBuilder();
            foreach (PropertyInfo prop in props)
            {
                object propValue = prop.GetValue(request, null);
                builder.AppendLine($"{prop.Name} : {propValue}");
            }
            logger.LogInformation(builder.ToString());
            return await next();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.ToString());
            throw;
        }
        finally
        {
            watch.Stop();
            logger.LogInformation($"Time elapsed: {watch.Elapsed}");
        }
    }
}
