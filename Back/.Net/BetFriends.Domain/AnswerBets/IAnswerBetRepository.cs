using BetFriends.Domain.Bets;

namespace BetFriends.Domain.AnswerBets;

public interface IAnswerBetRepository
{
    Task<IEnumerable<AnswerBet>> GetAnswersAsync(BetId betId);
    Task SaveAsync(AnswerBet answerBet);
}
