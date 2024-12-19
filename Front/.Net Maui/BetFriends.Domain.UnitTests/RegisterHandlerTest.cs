using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.Register;
using BetFriends.Domain.UnitTests.Implems;

namespace BetFriends.Domain.UnitTests;

public class RegisterHandlerTest
{
    [Fact]
    public async void ShouldRegisterAccount()
    {
        var request = new RegisterRequest("username", "email", "password", "password");
        var mockUserGateway = new MockUserGateway();
        var presenter = new MockRegisterPresenter();
        var idGenerator = new StubIdGenerator("id");
        var hashPassword = new StubHashPassword("hashed");
        var handler = new RegisterHandler(presenter, mockUserGateway, idGenerator, hashPassword);
        await handler.Handle(request, default!);
        Assert.Equal(new User(idGenerator.Id, request.Username, request.Email, $"hashed{request.Password}"), mockUserGateway.User);
        Assert.Equal("id", presenter.Id);
    }

    [Fact]
    public async Task ShouldNotRegisterAccountWhenPasswordsAreNotEqual()
    {
        var request = new RegisterRequest("username", "email", "password", "dorwssap");
        var presenter = new MockRegisterPresenter();
        var handler = new RegisterHandler(presenter, default!, default!, default!);
        await handler.Handle(request, default!);
        Assert.Equal("passwords are not equal", presenter.Error);
    }

    [Theory]
    [InlineData("", "email", "password", "password")]
    [InlineData("username", "", "password", "password")]
    [InlineData("username", "email", "", "password")]
    [InlineData("username", "email", "password", "")]
    public async Task ShouldNotRegisterAccountWhenDataAreEmpty(string username, string email, string password, string confirmPassword)
    {
        var request = new RegisterRequest(username, email, password, confirmPassword);
        var presenter = new MockRegisterPresenter();
        var handler = new RegisterHandler(presenter, default!, default!, default!);
        await handler.Handle(request, default!);
        Assert.Equal("field empty", presenter.Error);
    }
}




