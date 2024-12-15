using MediatR;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Reflection;
using System.Text;

namespace BetFriends.Shared.Infrastructure.Behaviors;

public class LoggingBehavior<TRequest, TResponse>(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
            : IPipelineBehavior<TRequest, TResponse>
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> logger = logger;

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
