using BetFriends.Domain.Abstractions;

namespace BetFriends.Blazor.Services;

internal class UserContext(Guid userId) : IUserContext
{
    public Guid UserId => userId;
}
