namespace BetFriends.Users.Domain.Users;

public record UserSnapshot(Guid Id, string Username, string Email, string Password, string RefreshToken);
