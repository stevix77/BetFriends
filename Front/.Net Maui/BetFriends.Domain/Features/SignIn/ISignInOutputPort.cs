namespace BetFriends.Domain.Features.SignIn;

public interface ISignInOutputPort
{
    void CredentialsUnkwonw();
    void EmailIsMissing();
    void PasswordIsMissing();
    void Success(Authentication authToken);
}
