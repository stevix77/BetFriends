
namespace BetFriends.Domain.Abstractions;

public interface IUserGateway
{
    Task SaveAsync(User user);
}

public record User(string Id, string Username, string Email, string Password);