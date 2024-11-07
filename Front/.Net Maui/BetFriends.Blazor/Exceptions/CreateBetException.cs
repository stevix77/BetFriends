namespace BetFriends.Blazor.Exceptions;

internal class CreateBetException : Exception
{
    public CreateBetException(string message) : base(message)
    {
    }
}
