using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Users.Infrastructure;

internal class UserCompositionRoot
{
    private static IServiceProvider _serviceProvider = default!;

    internal static IServiceScope BeginScope()
    {
        return _serviceProvider.CreateScope();
    }

    internal static void SetProvider(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
}
