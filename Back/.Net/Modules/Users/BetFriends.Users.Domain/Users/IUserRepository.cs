
namespace BetFriends.Users.Domain.Users;

public interface IUserRepository
{
    Task<bool> IsUserExistAsync(string username, string email);
    Task SaveAsync(User user);
}
