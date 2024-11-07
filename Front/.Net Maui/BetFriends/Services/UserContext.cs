using BetFriends.Domain.Abstractions;

namespace BetFriends.Services;

internal class UserContext(Guid userId) : IUserContext
{
    public Guid UserId => userId;
}
