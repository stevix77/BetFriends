using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;

namespace BetFriends.Bets.Application.UnitTests.Implems;

internal class MockAnswerBetRepository : IAnswerBetRepository
{
    public List<AnswerBet> Answers { get; internal set; } = new();

    public Task<IEnumerable<AnswerBet>> GetAnswersAsync(BetId betId)
    {
        throw new NotImplementedException();
    }

    public Task SaveAsync(AnswerBet answerBet)
    {
        Answers.Add(answerBet);
        return Task.CompletedTask;
    }
}
