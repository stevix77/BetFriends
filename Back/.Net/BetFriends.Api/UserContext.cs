using BetFriends.Application.Abstractions;

namespace BetFriends.Api;

public class UserContext : IUserContext
{
    public Guid UserId => Guid.Parse("11111111-1111-1111-1111-111111111111");
}
