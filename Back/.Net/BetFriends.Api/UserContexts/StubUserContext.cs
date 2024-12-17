using BetFriends.Bets.Application.Abstractions;

namespace BetFriends.Api.UserContexts;

public class StubUserContext : IUserContext
{
    public Guid UserId => Guid.Parse("11111111-1111-1111-1111-111111111111");

}
