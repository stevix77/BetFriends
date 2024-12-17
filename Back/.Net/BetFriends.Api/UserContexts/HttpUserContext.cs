using BetFriends.Bets.Application.Abstractions;

namespace BetFriends.Api.UserContexts;

public class HttpUserContext(IHttpContextAccessor httpContextAccessor) : IUserContext
{
    public Guid UserId
    {
        get
        {
            if(Guid.TryParse(httpContextAccessor.HttpContext?.Request.Headers.Authorization, out Guid id))
                return id;
            return Guid.Empty;
        }
    }
}
