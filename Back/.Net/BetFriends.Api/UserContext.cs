using BetFriends.Application.Abstractions;

namespace BetFriends.Api;

public class UserContext : IUserContext
{
    public Guid UserId => Guid.Parse("adadadad-1111-6666-4444-edededededed");
}
