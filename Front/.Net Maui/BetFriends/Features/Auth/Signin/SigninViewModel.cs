using BetFriends.Domain.Features.SignIn;
using BetFriends.Features.Auth.Register;
using BetFriends.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;

namespace BetFriends.Features.Auth.Signin;

public partial class SigninViewModel : ObservableObject
{
    public SigninViewModel(IMediator mediator, 
                           AuthenticationService authenticationService,
                           RegisterPage registerPage)
    {
        this.mediator = mediator;
        this.registerPage = registerPage;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, ErrorEmail>((o, e) =>
        {
            ErrorEmail = e.Message;
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, ErrorPassword>((o, e) =>
        {
            ErrorPassword = e.Message;
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, ErrorCredentials>((o, e) =>
        {
            Error = e.Message;
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, Authentication>(async (o, e) =>
        {
            Clear();
            await authenticationService.SaveAsync(e);
        }));
    }

    [ObservableProperty]
    private string email;

    [ObservableProperty]
    private string password;
    [ObservableProperty]
    private string errorEmail;
    [ObservableProperty]
    private string errorPassword;
    [ObservableProperty]
    private string error;
    private INavigation navigation;
    private readonly IMediator mediator;
    private readonly RegisterPage registerPage;

    internal void SetNavigation(INavigation navigation)
    {
        this.navigation = navigation;
    }

    [RelayCommand]
    private Task Validate()
    {
        Error = string.Empty;
        ErrorPassword = string.Empty;
        ErrorEmail = string.Empty;
        var request = new SignInRequest(Email, Password);
        return mediator.Send(request);
    }

    [RelayCommand]
    private Task Register()
    {
        Clear();
        return navigation.PushModalAsync(registerPage);
    }
    private void Clear()
    {
        ErrorPassword = string.Empty;
        ErrorEmail = string.Empty;
        Error = string.Empty;
        Email = string.Empty;
        Password = string.Empty;
    }
}
