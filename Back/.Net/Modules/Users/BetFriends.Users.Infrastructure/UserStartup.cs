using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Infrastructure.Gateways;
using BetFriends.Users.Infrastructure.Hash;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace BetFriends.Users.Infrastructure;

public static class UserStartup
{
    public static void Init(ILogger logger)
    {
        var services = new ServiceCollection();
        services.AddLogging(x => x.Services.AddScoped(sp => logger));
        services.AddScoped<IAuthenticationGateway, FakeAuthenticationGateway>();
        services.AddScoped<IHashPassword, FakeHashPassword>();
        services.AddSingleton<DomainEventsAccessor>();

        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssembly(typeof(Application.Application).Assembly);
        });
        UserCompositionRoot.SetProvider(services.BuildServiceProvider());
    }
}
