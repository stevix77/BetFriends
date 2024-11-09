using BetFriends.Domain.Abstractions;

namespace BetFriends.Services;

internal class UserContext(string userId) : IUserContext
{
    public string UserId => userId;
}
