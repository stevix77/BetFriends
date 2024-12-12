using BetFriends.Domain.Features.SignIn;
using CommunityToolkit.Mvvm.Messaging;
using System.Text.Json;

namespace BetFriends.Services;

public class AuthenticationService
{
    private Authentication authentication;
    internal bool IsConnected()
    {
        return authentication != null;
    }

    internal async void Load()
    {
        var value = await SecureStorage.GetAsync("auth_token");
        if(!string.IsNullOrEmpty(value))
            authentication = JsonSerializer.Deserialize<Authentication>(value);
    }

    internal void Logoff()
    {
        SecureStorage.Remove("auth_token");
        WeakReferenceMessenger.Default.Send(new SignOffRequest());
    }

    internal async Task SaveAsync(Authentication e)
    {
        await SecureStorage.SetAsync("auth_token", JsonSerializer.Serialize(e));
    }
}
