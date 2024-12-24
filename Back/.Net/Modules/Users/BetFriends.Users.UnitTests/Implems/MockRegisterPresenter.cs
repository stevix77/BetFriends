using BetFriends.Users.Application.Features.Register;

namespace BetFriends.Users.UnitTests.Implems;

internal class MockRegisterPresenter : IRegisterOutputPort
{
    public MockRegisterPresenter()
    {
    }

    public RegisterResponse? Response { get; private set; }
    public string? ErrorMessage { get; private set; }

    public void Present(RegisterResponse registerResponse)
    {
        Response = registerResponse;
    }

    public void UserAlreadyExist()
    {
        ErrorMessage = "user already exist";
    }
}
