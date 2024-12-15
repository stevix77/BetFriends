using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Users.Application.Abstractions;

namespace BetFriends.Users.Application.Features.SignIn;

public sealed class SignInHandler(IAuthenticationGateway authenticationGateway,
                                   IHashPassword hashPassword) : IQueryHandler<SignInQuery, Authentication>
{
    private readonly IAuthenticationGateway authenticationGateway = authenticationGateway;
    private readonly IHashPassword hashPassword = hashPassword;

    public Task<Authentication> Handle(SignInQuery request, CancellationToken cancellationToken)
    {
        var password = hashPassword.Hash(request.Password);
        return authenticationGateway.AuthenticateAsync(new AuthenticationRequest(request.Email, password));
    }
}


public record SignInQuery(string Email, string Password) : IQuery<Authentication>;

public record Authentication(string AccessToken, string RefreshToken);
