using BetFriend.Domain.Friends;
using BetFriend.Infrastructure.Repository;
using BetFriends.Domain.Abstractions;
using BetFriends.Infrastructure.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriend.Infrastructure;

public static class RegistryInfrastructure
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IFriendRepository, InMemoryFriendRepository>();
        services.AddScoped<IMemberRepository, InMemoryMemberRepository>();

        services.AddMediatR(x => x.RegisterServicesFromAssembly(typeof(Domain.Domain).Assembly));
        return services;
    }
}
