using BetFriends.Blazor.Presenters;
using BetFriends.Domain.Features.Register;
using BetFriends.Domain.Features.SignIn;
using BlazorBootstrap;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using Microsoft.AspNetCore.Components;

namespace BetFriends.Blazor.Components.Viewmodels;

public partial class RegisterViewModel : ObservableObject
{
    private readonly IMediator mediator;

    public RegisterViewModel(IMediator mediator,
                            NavigationManager navigationManage)
    {
        this.mediator = mediator;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, UserRegistered>(async (o, e) =>
        {
            var request = new SignInRequest(Email!, Password!);
            await mediator.Send(request);
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, FieldMissing>((o, e) =>
        {
            Errors.Add(new ToastMessage(ToastType.Danger, "Tous les champs sont requis"));
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, PasswordsNotEqual>((o, e) =>
        {
            Errors.Add(new ToastMessage(ToastType.Danger, "Les passwords ne sont pas identiques"));
        }));
    }

    [ObservableProperty]
    private string? username;
    [ObservableProperty]
    private string? email;
    [ObservableProperty]
    private string? password;
    [ObservableProperty]
    private string? confirmPassword;
    public List<ToastMessage> Errors { get; } = [];
    [RelayCommand]
    private Task Validate()
    {
        Errors.Clear();
        var request = new RegisterRequest(Username!, Email!, Password!, ConfirmPassword!);
        return mediator.Send(request);
    }
}
