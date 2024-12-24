namespace BetFriends.Users.Domain.Users;

public record UserState(Guid Id, string Username, string Email, string Password, string RefreshToken);
