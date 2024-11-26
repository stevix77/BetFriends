using BetFriends.Domain.AnswerBets;
using BetFriends.Domain.Bets;

namespace BetFriends.Application.UnitTests.Implems;

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
