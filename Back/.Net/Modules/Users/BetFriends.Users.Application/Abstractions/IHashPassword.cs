namespace BetFriends.Users.Application.Abstractions;

public interface IHashPassword
{
    string Hash(string password);
}
