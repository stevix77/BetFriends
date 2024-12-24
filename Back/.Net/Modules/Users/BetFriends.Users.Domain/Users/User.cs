using BetFriends.Shared.Domain;
using BetFriends.Users.Domain.Users.Events;

namespace BetFriends.Users.Domain.Users;

public class User : Entity
{
    private readonly UserId userId;
    private readonly string username;
    private readonly string email;
    private string password;
    private string refreshToken;

    private User(UserId userId, string username, string email, string password, string refreshToken)
    {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.refreshToken = refreshToken;
        AddEvent(new UserRegistered(userId, username, email));
    }

    public UserState State { get => new(userId.Value,
                                        username,
                                        email,
                                        password,
                                        refreshToken); }

    public static User Create(Guid userId, string username, string email, string password, ITokenGenerator tokenGenerator)
    {
        return new User(new UserId(userId), username, email, password, tokenGenerator.Generate(userId));
    }

    public static User FromState(UserState userState)
    {
        return new User(new(userState.Id), userState.Username, userState.Email, userState.Password, userState.RefreshToken);
    }
}
