namespace BetFriends.Users.Infrastructure.Configurations;

internal class JwtConfiguration 
{
    public string Key { get; init; }
    public string Issuer { get; init; }
    public string Audience { get; init; }
}
