using BetFriends.Application.Abstractions;
using BetFriends.Application.Features.RetrieveBets;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Friends;
using BetFriends.Domain.Members;
using BetFriends.Infrastructure.Behaviors;
using BetFriends.Infrastructure.DataAccess;
using BetFriends.Infrastructure.Event;
using BetFriends.Infrastructure.Outbox;
using BetFriends.Infrastructure.Repositories;
using BetFriends.Infrastructure.UoW;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Infrastructure;

public static class DependencyInjectionsExtension
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<IMemberRepository, FakeMemberRepository>();
        services.AddSingleton<IFriendshipRepository, FakeFriendshipRepository>();
        services.AddSingleton<IBetRepository, FakeBetRepository>();
        services.AddSingleton<IRetrieveBetsDataAccess>(x =>
        {
            return new FakeRetrieveBetsDataAccess(x.GetRequiredService<IBetRepository>() as FakeBetRepository,
                                                  x.GetRequiredService<IMemberRepository>() as FakeMemberRepository);
        });
        services.AddSingleton<IIdGenerator, GuidGenerator>();
        services.AddSingleton<IDateProvider, DateTimeProvider>();
        services.AddScoped<IBetModule, BetModule>();
        services.AddScoped<IUnitOfWork, InMemoryUnitOfWork>();
        services.AddSingleton<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped<DomainEventNotificationFactory>();
        services.AddSingleton<EventNotificationFactory>();
        services.AddSingleton<IOutboxRepository, FakeOutboxInMemoryRepository>();
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssembly(typeof(Application.Application).Assembly);
        });
        return services;
    }
}
