namespace BetFriends.Users.Application.Features.Register;

public interface IRegisterOutputPort
{
    void Present(RegisterResponse registerResponse);
    void UserAlreadyExist();
}
