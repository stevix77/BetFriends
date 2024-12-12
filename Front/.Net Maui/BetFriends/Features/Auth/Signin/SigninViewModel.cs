using BetFriends.Domain.Features.SignIn;
using BetFriends.Features.Bets.CreateBet;
using BetFriends.Services;
using CommunityToolkit.Maui.Alerts;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;

namespace BetFriends.Features.Auth.Signin;

public partial class SigninViewModel : ObservableObject
{
    public SigninViewModel(IMediator mediator, AuthenticationService authenticationService)
    {
        this.mediator = mediator;
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
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, Authentication>((o, e) =>
        {
            authenticationService.Save(e);
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
    private readonly IMediator mediator;

    [RelayCommand]
    private Task Validate()
    {
        Error = string.Empty;
        ErrorPassword = string.Empty;
        ErrorEmail = string.Empty;
        var request = new SignInRequest(Email, Password);
        return mediator.Send(request);
    }
}
