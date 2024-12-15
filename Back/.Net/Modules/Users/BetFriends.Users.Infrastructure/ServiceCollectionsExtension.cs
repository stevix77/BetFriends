using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Infrastructure.Gateways;
using BetFriends.Users.Infrastructure.Hash;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Users.Infrastructure;

public static class ServiceCollectionsExtension
{
    public static IServiceCollection AddUsersInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IAuthenticationGateway, FakeAuthenticationGateway>();
        services.AddScoped<IHashPassword, FakeHashPassword>();
        services.AddSingleton<DomainEventsAccessor>();

        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssembly(typeof(Application.Application).Assembly);
        });
        return services;
    }
}
