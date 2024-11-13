using BetFriends.Domain.AnswerBets;

namespace BetFriends.Application.UnitTests.Implems;

internal class MockAnswerBetRepository : IAnswerBetRepository
{
    public List<AnswerBet> Answers { get; internal set; } = new();

    public Task SaveAsync(AnswerBet answerBet)
    {
        Answers.Add(answerBet);
        return Task.CompletedTask;
    }
}
