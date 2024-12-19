using BetFriends.Domain.Abstractions;

namespace BetFriends.Infrastructure.Gateways;

internal class InMemoryAuthenticationGateway(InMemoryUserGateway userGateway) : IAuthenticationGateway
{
    private readonly InMemoryUserGateway userGateway = userGateway;

    public Task<AuthToken> AuthenticateAsync(string email, string password)
    {
        if (userGateway.Users.Any(x => x.Email == email && x.Password == password))
            return Task.FromResult(new AuthToken("accesstoken", "refresh"));
        return Task.FromResult<AuthToken>(default!);
    }
}
