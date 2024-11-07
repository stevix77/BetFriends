using Microsoft.AspNetCore.Components;

namespace BetFriends.Blazor.Services;

internal class Navigation(NavigationManager navigation) : Abstractions.INavigation
{
    private readonly NavigationManager navigation = navigation;

    public void Navigate(string path)
    {
        navigation.NavigateTo(path);
    }
}
