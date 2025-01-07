namespace BetFriends.Bets.Domain.AnswerBets
{
    public record AnswerBetSnapshot(Guid BetId, Guid MemberId, bool Answer);
}