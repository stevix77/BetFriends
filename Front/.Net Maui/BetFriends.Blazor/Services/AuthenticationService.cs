using BetFriends.Domain.Features.SignIn;
using CommunityToolkit.Mvvm.Messaging;
using System.Text.Json;
using static BetFriends.Blazor.Components.Pages.Signout;

namespace BetFriends.Blazor.Services;

public class AuthenticationService
{
    private Authentication authentication = default!;
    internal bool IsConnected()
    {
        return authentication != null;
    }

    internal async Task LoadAsync()
    {
        var value = await SecureStorage.GetAsync("auth_token");
        if (!string.IsNullOrEmpty(value))
            authentication = JsonSerializer.Deserialize<Authentication>(value);
    }

    internal void Logoff()
    {
        SecureStorage.Remove("auth_token");
        WeakReferenceMessenger.Default.Send(new SignOutRequest());
    }

    internal async Task SaveAsync(Authentication e)
    {
        await SecureStorage.SetAsync("auth_token", JsonSerializer.Serialize(e));
    }
}
