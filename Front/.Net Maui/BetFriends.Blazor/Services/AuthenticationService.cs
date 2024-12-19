using BetFriends.Domain.Features.SignIn;
using CommunityToolkit.Mvvm.Messaging;
using Microsoft.AspNetCore.Components.Authorization;
using System.Security.Claims;
using System.Text.Json;
using static BetFriends.Blazor.Components.Pages.Signout;

namespace BetFriends.Blazor.Services;

public class AuthenticationService : AuthenticationStateProvider
{
    private Authentication authentication = default!;

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        await LoadAsync();
        if (authentication == null)
            return new AuthenticationState(new ClaimsPrincipal());
        var claims = new[] { new Claim(ClaimTypes.Name, authentication.AccessToken) };
        return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity(claims, "Server authentication")));
    }

    private async Task LoadAsync()
    {
        var value = await SecureStorage.GetAsync("auth_token");
        if (!string.IsNullOrEmpty(value))
            authentication = JsonSerializer.Deserialize<Authentication>(value)!;
    }

    internal void Logoff()
    {
        SecureStorage.Remove("auth_token");
        NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
    }

    internal async Task SaveAsync(Authentication authentication)
    {
        await SecureStorage.SetAsync("auth_token", JsonSerializer.Serialize(authentication));
        NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
    }
}
