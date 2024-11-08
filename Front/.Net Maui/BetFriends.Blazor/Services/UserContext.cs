using BetFriends.Domain.Abstractions;

namespace BetFriends.Blazor.Services;

internal class UserContext(string userId) : IUserContext
{
    public string UserId => userId;
}
