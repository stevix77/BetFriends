using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.SignIn;
using BetFriends.Users.Infrastructure.Repositories;

namespace BetFriends.Users.Infrastructure.Gateways;

internal class FakeAuthenticationGateway(InMemoryUserRepository inMemoryUserRepository) : IAuthenticationGateway
{
    public Task<Authentication> AuthenticateAsync(AuthenticationRequest authenticationRequest)
    {
        var user = inMemoryUserRepository.GetUser(authenticationRequest.Email, authenticationRequest.Password);
        if (user is not null)
            return Task.FromResult(new Authentication("accesstoken", user.Snapshot.RefreshToken));

        return Task.FromResult<Authentication>(default!);
    }
}
