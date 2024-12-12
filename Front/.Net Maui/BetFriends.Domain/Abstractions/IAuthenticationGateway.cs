
namespace BetFriends.Domain.Abstractions;

public interface IAuthenticationGateway
{
    Task<AuthToken> AuthenticateAsync(string email, string password);
}

public record AuthToken(string AccessToken, string RefreshToken);