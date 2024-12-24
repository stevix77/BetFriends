
namespace BetFriends.Users.Domain;

public interface ITokenGenerator
{
    string Generate(Guid userId);
}
