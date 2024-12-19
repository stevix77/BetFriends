using BetFriends.Domain.Abstractions;
using MediatR;

namespace BetFriends.Domain.Features.Register;

public sealed class RegisterHandler(IRegisterOutputPort presenter,
                                    IUserGateway userGateway,
                                    IIdGenerator idGenerator,
                                    IHashPassword hashPassword) : IRequestHandler<RegisterRequest>
{
    private IRegisterOutputPort presenter = presenter;

    public async Task Handle(RegisterRequest request, CancellationToken cancellationToken)
    {
        if (IsNotValidRequest(request))
            return;

        if (IsPasswordsAreNotEqual(request))
        {
            presenter.PasswordsNotEqual();
            return;
        }

        var password = hashPassword.Hash(request.Password);
        var user = new User(idGenerator.Generate(), request.Username, request.Email, password);
        await userGateway.SaveAsync(user);
        presenter.Present(user.Id);
    }

    private static bool IsPasswordsAreNotEqual(RegisterRequest request)
        => request.Password != request.ConfirmPassword;

    private bool IsNotValidRequest(RegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.Email)
                    || string.IsNullOrEmpty(request.Username)
                    || string.IsNullOrEmpty(request.Password)
                    || string.IsNullOrEmpty(request.ConfirmPassword))
        {
            presenter.FieldEmpty();
            return true;
        }
        return false;
    }
}

public interface IRegisterOutputPort
{
    void FieldEmpty();
    void PasswordsNotEqual();
    void Present(string id);
}