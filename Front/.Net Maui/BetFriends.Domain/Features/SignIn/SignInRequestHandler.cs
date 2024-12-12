using BetFriends.Domain.Abstractions;
using MediatR;

namespace BetFriends.Domain.Features.SignIn;

public sealed class SignInRequestHandler(IAuthenticationGateway authRepository, 
                                        ISignInOutputPort signInOutputPort,
                                        IHashPassword hashPassword) : IRequestHandler<SignInRequest>
{
    private readonly IAuthenticationGateway authenticationGateway = authRepository;
    private readonly ISignInOutputPort signInOutputPort = signInOutputPort;
    private readonly IHashPassword hashPassword = hashPassword;

    public async Task Handle(SignInRequest request, CancellationToken cancellationToken)
    {
        bool hasError = IsValidRequest(request);
        if (hasError)
            return;

        var password = hashPassword.Hash(request.Password);
        var authToken = await authenticationGateway.AuthenticateAsync(request.Email, password);
        if (authToken != null)
        {
            signInOutputPort.Success(new Authentication(authToken.AccessToken, authToken.RefreshToken));
            return;
        }
        signInOutputPort.CredentialsUnkwonw();
    }

    private bool IsValidRequest(SignInRequest request)
    {
        var hasError = false;
        if (string.IsNullOrEmpty(request.Email))
        {
            hasError = true;
            signInOutputPort.EmailIsMissing();
        }
        if (string.IsNullOrEmpty(request.Password))
        {
            hasError = true;
            signInOutputPort.PasswordIsMissing();
        }

        return hasError;
    }
}

public record Authentication(string AccessToken, string RefreshToken);