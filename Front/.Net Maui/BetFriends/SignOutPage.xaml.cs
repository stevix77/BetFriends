using BetFriends.Services;

namespace BetFriends;

public partial class SignOutPage : ContentPage
{
    private readonly AuthenticationService authenticationService;

    public SignOutPage(AuthenticationService authenticationService)
    {
        InitializeComponent();
        this.authenticationService = authenticationService;
    }

    protected override void OnAppearing()
    {
        base.OnAppearing();
        authenticationService.Logoff();

    }
}

internal record SignOffRequest();