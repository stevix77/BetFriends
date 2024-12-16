namespace BetFriends.Bets.Domain.Bets;

public record MaxAnswerDate()
{
    public MaxAnswerDate(DateTime creationDate, DateTime endDate) : this()
    {
        Value = creationDate.AddSeconds(endDate.Subtract(creationDate).TotalSeconds / 2);
    }

    public DateTime Value { get; }

}
