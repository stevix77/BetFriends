using BetFriend.Domain.Friends;
using BetFriend.Infrastructure.Repository;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Bets;
using BetFriends.Infrastructure;
using BetFriends.Infrastructure.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriend.Infrastructure;

public static class RegistryInfrastructure
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, Func<IServiceProvider, IUserContext> implementationFactory)
    {
        services.AddScoped<IFriendRepository>(x => new InMemoryFriendRepository(x.GetRequiredService<IMemberRepository>()! as InMemoryMemberRepository));
        services.AddScoped<IMemberRepository, InMemoryMemberRepository>();
        services.AddScoped<IBetRepository>(x => new InMemoryBetRepository(x.GetRequiredService<IMemberRepository>()! as InMemoryMemberRepository,
                                                                        implementationFactory.Invoke(x)));
        services.AddScoped<IIdGenerator, GuidGenerator>();
        services.AddScoped<IDateTimeProvider, DateTimeProvider>();

        services.AddMediatR(x => x.RegisterServicesFromAssembly(typeof(Domain.Domain).Assembly));
        return services;
    }
}
