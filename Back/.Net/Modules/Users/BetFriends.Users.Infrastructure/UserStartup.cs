using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure;
using BetFriends.Shared.Infrastructure.Behaviors;
using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Shared.Infrastructure.UoW;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.Register;
using BetFriends.Users.Domain;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.Infrastructure.DomainEventsDispatching;
using BetFriends.Users.Infrastructure.Gateways;
using BetFriends.Users.Infrastructure.Hash;
using BetFriends.Users.Infrastructure.IntegrationEvents;
using BetFriends.Users.Infrastructure.Outboxes;
using BetFriends.Users.Infrastructure.Repositories;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Users.Infrastructure.TokenGenerators;
using BetFriends.Users.Infrastructure.UoW;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace BetFriends.Users.Infrastructure;

public static class UserStartup
{
    public static void Init(ILogger logger, Shared.Infrastructure.EventBus.IEventBus eventBus)
    {
        var services = new ServiceCollection();
        services.AddScoped(x => logger);
        services.AddScoped(x => eventBus);
        services.AddScoped<IAuthenticationGateway>(x => new FakeAuthenticationGateway((x.GetRequiredService<IUserRepository>()! as InMemoryUserRepository)!));
        services.AddScoped<IHashPassword, FakeHashPassword>();
        services.AddSingleton<IDateProvider, DateTimeProvider>();
        services.AddSingleton<IUserRepository, InMemoryUserRepository>();
        services.AddScoped<ITokenGenerator, FakeTokenGenerator>();
        services.AddScoped<IIdGenerator, GuidGenerator>();
        services.AddScoped<JwtTokenGenerator>();
        services.AddDbContext<DbContext, UserContext>(options => options.UseSqlServer(""));
        services.AddScoped<DomainEventNotificationFactory>();
        services.AddScoped<IntegrationEventFactory>();
        services.AddSingleton<DomainEventsAccessor>();
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddSingleton<IOutbox, InMemoryOutboxAccessor>();
        services.AddScoped<IUnitOfWork, InMemoryUnitOfWork>();
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(UnitOfWorkBehavior<,>));
        services.AddMediatR(x =>
        {
            x.RegisterServicesFromAssemblies(typeof(Application.Application).Assembly, typeof(UserModule).Assembly);
        });
        UserCompositionRoot.SetProvider(services.BuildServiceProvider());
    }
}
