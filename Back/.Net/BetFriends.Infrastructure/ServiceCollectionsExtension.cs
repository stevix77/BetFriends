using BetFriends.Application.Abstractions;
using BetFriends.Application.Features.CompleteBet;
using BetFriends.Application.Features.RetrieveBets;
using BetFriends.Domain.AnswerBets;
using BetFriends.Domain.Bets;
using BetFriends.Domain.Friends;
using BetFriends.Domain.Members;
using BetFriends.Domain.Members.Services;
using BetFriends.Infrastructure.DataAccess;
using BetFriends.Infrastructure.Event;
using BetFriends.Infrastructure.Notifiers;
using BetFriends.Infrastructure.Outbox;
using BetFriends.Infrastructure.Repositories;
using BetFriends.Infrastructure.UoW;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure;
using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.UoW;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Infrastructure;

public static class ServiceCollectionsExtension
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<IMemberRepository, FakeMemberRepository>();
        services.AddSingleton<IFriendshipRepository, FakeFriendshipRepository>();
        services.AddSingleton<IBetRepository, FakeBetRepository>();
        services.AddSingleton<IAnswerBetRepository, FakeAnswerBetRepository>();
        services.AddSingleton<IRetrieveBetsDataAccess>(x =>
        {
            return new FakeRetrieveBetsDataAccess((x.GetRequiredService<IBetRepository>()! as FakeBetRepository)!,
                                                  (x.GetRequiredService<IMemberRepository>()! as FakeMemberRepository)!,
                                                  (x.GetRequiredService<IAnswerBetRepository>() as FakeAnswerBetRepository)!);
        });
        services.AddSingleton<IIdGenerator, GuidGenerator>();
        services.AddSingleton<IDateProvider, DateTimeProvider>();
        services.AddScoped<IBetModule, BetModule>();
        services.AddScoped<IUnitOfWork, InMemoryUnitOfWork>();
        services.AddScoped<DecreaseCoinsMember>();
        services.AddSingleton<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped<DomainEventNotificationFactory>();
        services.AddScoped<INotifyBetCompleted, NotifyBetCompleted>();
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
