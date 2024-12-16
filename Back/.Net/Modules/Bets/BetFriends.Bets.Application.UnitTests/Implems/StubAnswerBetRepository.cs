using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;

namespace BetFriends.Bets.Application.UnitTests.Implems;

internal class StubAnswerBetRepository : IAnswerBetRepository
{
    private readonly IEnumerable<AnswerBet> answerBets;

    public StubAnswerBetRepository(IEnumerable<AnswerBet> answerBets)
    {
        this.answerBets = answerBets;
    }
    public Task<IEnumerable<AnswerBet>> GetAnswersAsync(BetId betId)
    {
        return Task.FromResult(answerBets);
    }

    public Task SaveAsync(AnswerBet answerBet)
    {
        throw new NotImplementedException();
    }
}
