using BetFriends.Shared.Application.Abstractions;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.Register;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.UnitTests.Implems;

namespace BetFriends.Users.UnitTests.Features;

public class RegisterHandlerTest
{
    [Fact]
    public async Task ShouldRegisterUser()
    {
        var outputPort = new MockRegisterPresenter();
        var command = new RegisterCommand("username", "email@email.fr", "password", outputPort);
        var repository = new MockUserRepository();
        var id = Guid.NewGuid();
        var idGenerator = new StubIdGenerator(id);
        var passwordHasher = new MockPasswordHasher();
        var tokenGenerator = new StubTokenGenerator();
        var handler = new RegisterCommandHandler(repository, idGenerator, passwordHasher, tokenGenerator);
        await handler.Handle(command, CancellationToken.None);
        Assert.Equal(new RegisterResponse(id), outputPort.Response);
        Assert.Equal(new UserSnapshot(id, "username", "email@email.fr", "hashedpassword", "refreshToken"), repository.User.Snapshot);
    }

    [Fact]
    public async Task ShouldNotRegisterUserWhenEmailOrUsernameAlreadyExist()
    {
        var outputPort = new MockRegisterPresenter();
        var command = new RegisterCommand("username", "email@email.fr", "password", outputPort);
        var repository = new MockUserRepository(User.FromState(new UserSnapshot(Guid.Empty, "username", "email", "password", "refreshtoken")));
        var idGenerator = new StubIdGenerator(Guid.NewGuid());
        var passwordHasher = new MockPasswordHasher();
        var tokenGenerator = new StubTokenGenerator();
        var handler = new RegisterCommandHandler(repository, idGenerator, passwordHasher, tokenGenerator);
        await handler.Handle(command, CancellationToken.None);
        Assert.Equal("user already exist", outputPort.ErrorMessage);
    }
}