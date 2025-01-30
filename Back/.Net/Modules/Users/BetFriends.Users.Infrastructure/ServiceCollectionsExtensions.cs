using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Shared.Infrastructure.UoW;
using BetFriends.Shared.Infrastructure;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.Domain;
using BetFriends.Users.Infrastructure.DomainEventsDispatching;
using BetFriends.Users.Infrastructure.Gateways;
using BetFriends.Users.Infrastructure.Hash;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Users.Infrastructure.Repositories.Sql;
using BetFriends.Users.Infrastructure.TokenGenerators;
using BetFriends.Users.Infrastructure.UoW;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BetFriends.Users.Infrastructure.Configurations;
using BetFriends.Users.Infrastructure.Outboxes;
using Microsoft.Extensions.Logging;

namespace BetFriends.Users.Infrastructure;

public static class ServiceCollectionsExtensions
{
    public static IServiceCollection AddUsersInfrastructure(this IServiceCollection services, InfrastructureConfiguration configuration)
    {
        services.AddDbContext<UserContext>((sp, options) =>
        {
            options.UseSqlServer(configuration.ConnectionString)
                    .LogTo(Console.WriteLine, LogLevel.Debug);
        }, ServiceLifetime.Singleton, ServiceLifetime.Singleton);
        //services.AddScoped<IDateProvider, DateTimeProvider>();
        services.AddSingleton<DomainEventsAccessor>();
        services.AddSingleton<IUserModule, UserModule>();
        services.AddSingleton<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddSingleton<IIdGenerator, GuidGenerator>();
        services.AddSingleton<JwtTokenGenerator>(x => new JwtTokenGenerator(default, x.GetRequiredService<IDateProvider>()));
        services.AddSingleton<IHashPassword, Sha256HashPassword>();
        services.AddSingleton<IAuthenticationGateway, AuthenticationGateway>();
        services.AddSingleton<IUserRepository, SqlUserRepository>();
        services.AddSingleton<ITokenGenerator, TokenGenerator>();
        services.AddSingleton<IOutbox, SqlOutboxAccessor>();
        services.AddSingleton<IUnitOfWork, UnitOfWork>();
        services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssemblies(typeof(Application.Application).Assembly, typeof(UserModule).Assembly);
        });
        return services;
    }
}
