using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Domain;
using BetFriends.Users.Domain.Users;

namespace BetFriends.Users.Application.Features.Register;

public sealed class RegisterCommandHandler : ICommandHandler<RegisterCommand>
{
    private readonly IUserRepository repository;
    private readonly IIdGenerator idGenerator;
    private readonly IHashPassword passwordHasher;
    private readonly ITokenGenerator tokenGenerator;

    public RegisterCommandHandler(IUserRepository repository,
                                  IIdGenerator idGenerator,
                                  IHashPassword passwordHasher,
                                  ITokenGenerator tokenGenerator)
    {
        this.repository = repository;
        this.idGenerator = idGenerator;
        this.passwordHasher = passwordHasher;
        this.tokenGenerator = tokenGenerator;
    }

    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if(await repository.IsUserExistAsync(request.Username, request.Email))
        {
            request.outputPort.UserAlreadyExist();
            return;
        }
        var userId = idGenerator.Generate();
        var user = User.Create(userId,
                               request.Username,
                               request.Email,
                               passwordHasher.Hash(request.Password),
                               tokenGenerator);
        await repository.SaveAsync(user);
        request.outputPort.Present(new RegisterResponse(userId));
    }
}
