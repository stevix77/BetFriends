using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.RetrieveBets;
using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Friends;
using BetFriends.Bets.Domain.Members.Services;
using BetFriends.Bets.Domain.Members;
using BetFriends.Bets.Infrastructure.DataAccess;
using BetFriends.Bets.Infrastructure.Event;
using BetFriends.Bets.Infrastructure.Notifiers;
using BetFriends.Bets.Infrastructure.Outboxes;
using BetFriends.Bets.Infrastructure.Repositories;
using BetFriends.Bets.Infrastructure.UoW;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Shared.Infrastructure.UoW;
using BetFriends.Shared.Infrastructure;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using BetFriends.Bets.Application.Features.MemberInfo;

namespace BetFriends.Bets.Infrastructure;

public static class BetStartup
{
    public static void Init(ILogger logger, Shared.Infrastructure.EventBus.IEventBus eventBus)
    {
        var services = new ServiceCollection();
        services.AddScoped(x => logger);
        services.AddScoped(x => eventBus);
        services.AddSingleton<IMemberRepository, FakeMemberRepository>();
        services.AddSingleton<IFriendshipRepository, FakeFriendshipRepository>();
        services.AddSingleton<IBetRepository, FakeBetRepository>();
        services.AddSingleton<IAnswerBetRepository, FakeAnswerBetRepository>();
        services.AddSingleton<IGetMemberInfoDataAccess>(x =>
        {
            return new FakeGetMemberInfoDataAccess(
                (x.GetRequiredService<IMemberRepository>()! as FakeMemberRepository)!
            );
        });
        services.AddSingleton<IRetrieveBetsDataAccess>(x =>
        {
            return new FakeRetrieveBetsDataAccess((x.GetRequiredService<IBetRepository>()! as FakeBetRepository)!,
                                                  (x.GetRequiredService<IMemberRepository>()! as FakeMemberRepository)!,
                                                  (x.GetRequiredService<IAnswerBetRepository>() as FakeAnswerBetRepository)!);
        });
        services.AddSingleton<IIdGenerator, GuidGenerator>();
        services.AddSingleton<IDateProvider, DateTimeProvider>();
        services.AddSingleton<IBetModule, BetModule>();
        services.AddScoped<IUnitOfWork, InMemoryUnitOfWork>();
        services.AddScoped<DecreaseCoinsMember>();
        services.AddSingleton<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped<DomainEventNotificationFactory>();
        services.AddScoped<INotifyBetCompleted, NotifyBetCompleted>();
        services.AddSingleton<EventNotificationFactory>();
        services.AddSingleton<IOutbox, InMemoryOutboxAccessor>();
        services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssemblies(typeof(Application.Application).Assembly, typeof(BetModule).Assembly);
        });
        BetCompositionRoot.SetProvider(services.BuildServiceProvider());
    }
}
