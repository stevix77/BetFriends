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
using BetFriends.Bets.Infrastructure.IntegrationEvents;
using Microsoft.EntityFrameworkCore;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.Data.SqlClient;
using BetFriends.Bets.Infrastructure.Configurations;
using BetFriends.Shared.Infrastructure.EventBus;
using BetFriends.Bets.Infrastructure.Repositories.Sql;
using BetFriends.Bets.Infrastructure.DataAccess.Sql;

namespace BetFriends.Bets.Infrastructure;

public static class BetStartup
{
    public static void Init(ILogger logger, Shared.Infrastructure.EventBus.IEventBus eventBus, Configurations.InfrastructureConfiguration infrastructureConfiguration)
    {
        if (infrastructureConfiguration.UseFake)
        {
            UseFake(logger, eventBus);
            return;
        }

        UseReal(logger, eventBus, infrastructureConfiguration);
        
    }

    private static void UseReal(ILogger logger, IEventBus eventBus, InfrastructureConfiguration infrastructureConfiguration)
    {
        var services = new ServiceCollection();
        services.AddScoped(x => logger);
        services.AddScoped(x => eventBus);
        services.AddScoped<IOutbox, SqlOutboxAccessor>();
        services.AddScoped<IMemberRepository, SqlMemberRepository>();
        services.AddScoped<IFriendshipRepository, SqlFriendshipRepository>();
        services.AddScoped<IBetRepository, SqlBetRepository>();
        services.AddScoped<IAnswerBetRepository, SqlAnswerRepository>();
        services.AddScoped<IGetMemberInfoDataAccess, GetMemberInfoDataAccess>();
        services.AddSingleton<IRetrieveBetsDataAccess, SqlRetrieveBetsDataAccess>();
        services.AddScoped(x =>
        {
            var connection = new SqlConnection(infrastructureConfiguration.ConnectionString);
            connection.Open();
            return connection;
        });
        services.AddDbContext<DbContext, BetContext>((sp, options) => options.UseSqlServer(sp.GetRequiredService<SqlConnection>()));
        services.AddScoped<IIdGenerator, GuidGenerator>();
        services.AddScoped<IDateProvider, DateTimeProvider>();
        services.AddScoped<IBetModule, BetModule>();
        services.AddScoped<DecreaseCoinsMember>();
        services.AddScoped<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped<INotifyBetCompleted, NotifyBetCompleted>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssemblies(typeof(Application.Application).Assembly, typeof(BetModule).Assembly);
        });
        BetCompositionRoot.SetProvider(services.BuildServiceProvider());
    }

    private static void UseFake(ILogger logger, IEventBus eventBus)
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
        services.AddScoped<INotifyBetCompleted, NotifyBetCompleted>();
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
