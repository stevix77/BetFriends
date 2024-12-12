namespace BetFriends.Domain.Abstractions;

public interface IHashPassword
{
    string Hash(string password);
}
