namespace BetFriends.Bets.Domain.Members;

public record MemberState(Guid MemberId, string Username, int Coins, int CountFriends);
