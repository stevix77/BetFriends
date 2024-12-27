namespace BetFriends.Bets.Domain.Members.Exceptions;

public class CannotBetException : Exception
{
    public const string CoinsNotEnough = "Not enough chips";
    public const string NoneFriends = "No friend";
    public CannotBetException(string message) : base(message) { }
}
