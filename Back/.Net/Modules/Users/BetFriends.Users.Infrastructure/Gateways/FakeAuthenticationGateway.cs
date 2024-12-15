using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.SignIn;

namespace BetFriends.Users.Infrastructure.Gateways;

internal class FakeAuthenticationGateway : IAuthenticationGateway
{
    public Task<Authentication> AuthenticateAsync(AuthenticationRequest authenticationRequest)
    {
        if (authenticationRequest.Email == "email@email.fr" && authenticationRequest.Password == "hashedpassword")
            return Task.FromResult(new Authentication("accesstoken", "refreshtoken"));

        return Task.FromResult<Authentication>(default!);
    }
}
