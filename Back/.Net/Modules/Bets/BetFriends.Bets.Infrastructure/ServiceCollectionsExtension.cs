using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.RetrieveBets;
using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Friends;
using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Domain.Members.Services;
using BetFriends.Bets.Infrastructure.DataAccess;
using BetFriends.Bets.Infrastructure.Event;
using BetFriends.Bets.Infrastructure.Notifiers;
using BetFriends.Bets.Infrastructure.Outboxes;
using BetFriends.Bets.Infrastructure.Repositories;
using BetFriends.Bets.Infrastructure.UoW;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure;
using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Shared.Infrastructure.UoW;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Bets.Infrastructure;

public static class ServiceCollectionsExtension
{
    public static IServiceCollection AddBetInfrastructure(this IServiceCollection services)
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
        services.AddSingleton<IOutbox, InMemoryOutboxAccessor>();
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssembly(typeof(Application.Application).Assembly);
        });
        return services;
    }
}
