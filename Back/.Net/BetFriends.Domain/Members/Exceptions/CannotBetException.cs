namespace BetFriends.Domain.Members.Exceptions;

public class CannotBetException : Exception
{
    public const string ChipsNotEnough = "Not enough chips";
    public const string NoneFriends = "No friend";
    public CannotBetException(string message) : base(message) { }
}
