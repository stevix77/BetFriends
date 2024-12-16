using BetFriends.Bets.Domain.Bets;

namespace BetFriends.Bets.Domain.AnswerBets;

public interface IAnswerBetRepository
{
    Task<IEnumerable<AnswerBet>> GetAnswersAsync(BetId betId);
    Task SaveAsync(AnswerBet answerBet);
}
