using BetFriends.Domain.AnswerBets;

namespace BetFriends.Application.UnitTests.Implems;

internal class MockAnswerBetRepository : IAnswerBetRepository
{
    public MockAnswerBetRepository()
    {
    }

    public List<object> Answers { get; internal set; } = new List<object>();

    public Task SaveAsync(AnswerBet answerBet)
    {
        Answers.Add(answerBet);
        return Task.CompletedTask;
    }
}
