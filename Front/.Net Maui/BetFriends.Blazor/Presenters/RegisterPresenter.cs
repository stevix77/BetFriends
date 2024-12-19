using BetFriends.Domain.Features.Register;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriends.Blazor.Presenters;

internal class RegisterPresenter : IRegisterOutputPort
{
    public void FieldEmpty()
    {
        WeakReferenceMessenger.Default.Send(new FieldMissing());
    }

    public void PasswordsNotEqual()
    {
        WeakReferenceMessenger.Default.Send(new PasswordsNotEqual());
    }

    public void Present(string id)
    {
        WeakReferenceMessenger.Default.Send(new UserRegistered(id));
    }
}

internal record FieldMissing();
internal record PasswordsNotEqual();
internal record UserRegistered(string Id);