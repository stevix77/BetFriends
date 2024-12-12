using BetFriends.Domain.Abstractions;

namespace BetFriends.Infrastructure.Gateways;

internal class InMemoryAuthenticationGateway : IAuthenticationGateway
{
    public Task<AuthToken> AuthenticateAsync(string email, string password)
    {
        if (email == "email@email.fr" && password == "hashedpassword")
            return Task.FromResult(new AuthToken("accesstoken", "refresh"));
        return Task.FromResult<AuthToken>(default!);
    }
}
