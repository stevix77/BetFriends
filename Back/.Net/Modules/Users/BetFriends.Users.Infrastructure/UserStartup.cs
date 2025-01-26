using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure;
using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.EventBus;
using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Shared.Infrastructure.UoW;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Domain;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.Infrastructure.Configurations;
using BetFriends.Users.Infrastructure.DomainEventsDispatching;
using BetFriends.Users.Infrastructure.Gateways;
using BetFriends.Users.Infrastructure.Hash;
using BetFriends.Users.Infrastructure.IntegrationEvents;
using BetFriends.Users.Infrastructure.Outboxes;
using BetFriends.Users.Infrastructure.Repositories;
using BetFriends.Users.Infrastructure.Repositories.Sql;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Users.Infrastructure.TokenGenerators;
using BetFriends.Users.Infrastructure.UoW;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog.Core;
using System.Data.Common;

namespace BetFriends.Users.Infrastructure;

public static class UserStartup
{
    public static void Init(ILogger logger,
                            IEventBus eventBus,
                            InfrastructureConfiguration infrastructureConfiguration)
    {
        
        if (infrastructureConfiguration.UseFake)
        {
            UseFakes(logger, eventBus);
            return;
        }

        UseReal(logger, eventBus, infrastructureConfiguration);
    }

    private static void UseReal(ILogger logger, IEventBus eventBus, InfrastructureConfiguration configuration)
    {
        var services = new ServiceCollection();
        services.AddScoped(x => logger);
        services.AddScoped(x => eventBus);
        //services.AddScoped(x =>
        //{
        //    var connection = new SqlConnection(configuration.ConnectionString);
        //    connection.Open();
        //    return connection;
        //});
        //services.AddScoped(x =>
        //{
        //    var connection = x.GetRequiredService<SqlConnection>();
        //    return connection.BeginTransaction();
        //});
        //services.AddDbContext<UserContext>((sp, options) =>
        //{
        //    options.UseSqlServer(sp.GetRequiredService<SqlConnection>())
        //            .LogTo(Console.WriteLine, LogLevel.Debug);
        //});
        services.AddScoped<UserContext>(sp =>
        {
            var optionsBuilder = new DbContextOptionsBuilder<UserContext>();
            var dbContextOptions = optionsBuilder.UseSqlServer(configuration.ConnectionString).Options;
            return new UserContext(dbContextOptions);
        });
        services.AddScoped<IDateProvider, DateTimeProvider>();
        services.AddScoped<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped<IIdGenerator, GuidGenerator>();
        services.AddScoped<JwtTokenGenerator>();
        services.AddScoped<IHashPassword, Sha256HashPassword>();
        services.AddScoped<IAuthenticationGateway, AuthenticationGateway>();
        services.AddScoped<IUserRepository, SqlUserRepository>();
        services.AddScoped<ITokenGenerator, TokenGenerator>();
        services.AddScoped<IOutbox, SqlOutboxAccessor>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssemblies(typeof(Application.Application).Assembly, typeof(UserModule).Assembly);
        });
        UserCompositionRoot.SetProvider(services.BuildServiceProvider());
    }

    private static void UseFakes(ILogger logger, IEventBus eventBus)
    {
        var services = new ServiceCollection();
        services.AddScoped(x => logger);
        services.AddScoped(x => eventBus);
        services.AddScoped<IDateProvider, DateTimeProvider>();
        services.AddSingleton<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped<IIdGenerator, GuidGenerator>();
        services.AddScoped<JwtTokenGenerator>();
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssemblies(typeof(Application.Application).Assembly, typeof(UserModule).Assembly);
        });
        services.AddScoped<IAuthenticationGateway>(x => new FakeAuthenticationGateway((x.GetRequiredService<IUserRepository>()! as InMemoryUserRepository)!));
        services.AddScoped<IHashPassword, FakeHashPassword>();
        services.AddSingleton<IUserRepository, InMemoryUserRepository>();
        services.AddScoped<ITokenGenerator, FakeTokenGenerator>();
        services.AddSingleton<IOutbox, InMemoryOutboxAccessor>();
        services.AddScoped<IUnitOfWork, InMemoryUnitOfWork>();
        UserCompositionRoot.SetProvider(services.BuildServiceProvider());
    }
}
