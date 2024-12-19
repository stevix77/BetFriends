using BetFriends.Domain.Features.Register;
using BetFriends.Domain.Features.SignIn;
using BetFriends.Features.Auth.Signin;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;

namespace BetFriends.Features.Auth.Register;

public partial class RegisterViewModel : ObservableObject
{
    private INavigation navigation;
    private readonly IMediator mediator;

    public RegisterViewModel(IMediator mediator)
    {
        this.mediator = mediator;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, UserRegistered>(async (o, e) =>
        {
            Clear();
            var request = new SignInRequest(Email!, Password!);
            await mediator.Send(request);
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, FieldMissing>((o, e) =>
        {
            Error = "Tous les champs sont requis";
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, PasswordsNotEqual>((o, e) =>
        {
            Error = "Les passwords ne sont pas identiques";
        }));
    }

    [ObservableProperty]
    private string username;
    [ObservableProperty]
    private string email;
    [ObservableProperty]
    private string password;
    [ObservableProperty]
    private string confirmPassword;
    [ObservableProperty]
    private string error;

    internal void SetNavigation(INavigation navigation)
    {
        this.navigation = navigation;
    }

    [RelayCommand]
    private Task Validate()
    {
        Error = string.Empty;
        var request = new RegisterRequest(Username, Email, Password, ConfirmPassword);
        return mediator.Send(request);
    }

    [RelayCommand]
    private Task<Page> SignIn()
    {
        Clear();
        return navigation.PopModalAsync();
    }

    private void Clear()
    {
        Error = string.Empty;
        Username = string.Empty;
        Email = string.Empty;
        Password = string.Empty;
        ConfirmPassword = string.Empty;
    }
}
