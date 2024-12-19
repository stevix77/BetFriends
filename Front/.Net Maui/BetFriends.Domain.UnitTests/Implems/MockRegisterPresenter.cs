using BetFriends.Domain.Features.Register;

namespace BetFriends.Domain.UnitTests.Implems;

internal class MockRegisterPresenter : IRegisterOutputPort
{
    public string Error { get; private set; }
    public string Id { get; private set; }

    public void FieldEmpty()
    {
        Error = "field empty";
    }

    public void PasswordsNotEqual()
    {
        Error = "passwords are not equal";
    }

    public void Present(string id)
    {
        Id = id;
    }
}
