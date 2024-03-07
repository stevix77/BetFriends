using BetFriends.Domain.Friends;
using BetFriends.Domain.Members;
using BetFriends.Infrastructure.Behaviors;
using BetFriends.Infrastructure.Event;
using BetFriends.Infrastructure.Repositories;
using BetFriends.Infrastructure.UoW;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Infrastructure;

public static class ServicesRegistration
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<IMemberRepository, FakeMemberRepository>();
        services.AddSingleton<IFriendshipRepository, FakeFriendshipRepository>();
        services.AddScoped<IBetModule, BetModule>();
        services.AddScoped<IUnitOfWork, InMemoryUnitOfWork>();
        services.AddSingleton<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssembly(typeof(Application.Application).Assembly);
        });
        return services;
    }
}
