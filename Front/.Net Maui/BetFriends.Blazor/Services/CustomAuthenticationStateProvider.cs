using Microsoft.AspNetCore.Components.Authorization;

namespace BetFriends.Blazor.Services;

public class CustomAuthenticationStateProvider : AuthenticationStateProvider
{
    public override Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        throw new NotImplementedException();
    }
}
