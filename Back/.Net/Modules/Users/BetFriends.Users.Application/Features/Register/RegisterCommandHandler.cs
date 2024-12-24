using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Domain;
using BetFriends.Users.Domain.Users;

namespace BetFriends.Users.Application.Features.Register;

public sealed class RegisterCommandHandler : ICommandHandler<RegisterCommand>
{
    private readonly IUserRepository repository;
    private readonly IRegisterOutputPort outputPort;
    private readonly IIdGenerator idGenerator;
    private readonly IHashPassword passwordHasher;
    private readonly ITokenGenerator tokenGenerator;

    public RegisterCommandHandler(IUserRepository repository,
                                  IRegisterOutputPort outputPort,
                                  IIdGenerator idGenerator,
                                  IHashPassword passwordHasher,
                                  ITokenGenerator tokenGenerator)
    {
        this.repository = repository;
        this.outputPort = outputPort;
        this.idGenerator = idGenerator;
        this.passwordHasher = passwordHasher;
        this.tokenGenerator = tokenGenerator;
    }

    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if(await repository.IsUserExistAsync(request.Username, request.Email))
        {
            outputPort.UserAlreadyExist();
            return;
        }

        var user = User.Create(idGenerator.Generate(),
                               request.Username,
                               request.Email,
                               passwordHasher.Hash(request.Password),
                               tokenGenerator);
        await repository.SaveAsync(user);
        outputPort.Present(new RegisterResponse(idGenerator.Generate()));
    }
}
