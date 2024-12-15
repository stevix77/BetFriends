using BetFriends.Users.Application.Features.SignIn;

namespace BetFriends.Users.Application.Abstractions;


public interface IAuthenticationGateway
{
    Task<Authentication> AuthenticateAsync(AuthenticationRequest authenticationRequest);
}

public record AuthenticationRequest(string Email, string Password);
