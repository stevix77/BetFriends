
namespace BetFriends.Domain.Bets.Exceptions;

[Serializable]
public class BookieCompleteException(string message) : Exception(message)
{
}