using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.SignIn;
using CommunityToolkit.Mvvm.Messaging;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BetFriends.Features.Auth.Signin;

internal class SignInPresenter : ISignInOutputPort
{
    public void CredentialsUnkwonw()
    {
        WeakReferenceMessenger.Default.Send(new ErrorCredentials("Erreur d'identification"));
    }

    public void EmailIsMissing()
    {
        WeakReferenceMessenger.Default.Send(new ErrorEmail("Email requis"));
    }

    public void PasswordIsMissing()
    {
        WeakReferenceMessenger.Default.Send(new ErrorPassword("Password requis"));
    }

    public void Success(Authentication authToken)
    {
        WeakReferenceMessenger.Default.Send(authToken);
    }
}

internal record ErrorCredentials(string Message);
internal record ErrorEmail(string Message);
internal record ErrorPassword(string Message);