namespace BetFriends.Features.Bets.CreateBet;

internal class CreateBetException : Exception
{
    public CreateBetException(string message) : base(message)
    {
    }
}
