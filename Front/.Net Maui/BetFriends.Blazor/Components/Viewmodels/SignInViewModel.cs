using BetFriends.Blazor.Presenters;
using BetFriends.Blazor.Services;
using BetFriends.Domain.Features.SignIn;
using BlazorBootstrap;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;

namespace BetFriends.Blazor.Components.Viewmodels;

public partial class SignInViewModel : ObservableObject
{
    public SignInViewModel(IMediator mediator, AuthenticationService authenticationService)
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
            Errors.Add(new ToastMessage(ToastType.Danger, e.Message));
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, Authentication>(async (o, e) =>
        {
            await authenticationService.SaveAsync(e);
        }));
    }

    [ObservableProperty]
    private string? email;

    [ObservableProperty]
    private string? password;
    [ObservableProperty]
    private string? errorEmail;
    [ObservableProperty]
    private string? errorPassword;
    private readonly IMediator mediator;
    public List<ToastMessage> Errors { get; } = new List<ToastMessage>();
    [RelayCommand]
    private Task Validate()
    {
        ErrorPassword = string.Empty;
        ErrorEmail = string.Empty;
        var request = new SignInRequest(Email, Password);
        return mediator.Send(request);
    }
}
