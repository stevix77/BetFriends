using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Shared.Infrastructure.Event;

namespace BetFriends.Bets.Infrastructure.Repositories;

internal class FakeAnswerBetRepository : IAnswerBetRepository
{
    private readonly ICollection<AnswerBet> answerBets;
    private readonly DomainEventsAccessor domainEventsAccessor;

    public FakeAnswerBetRepository(DomainEventsAccessor domainEventsAccessor)
    {
        answerBets = new HashSet<AnswerBet>();
        this.domainEventsAccessor = domainEventsAccessor;
    }

    public Task SaveAsync(AnswerBet answerBet)
    {
        var oldAnswerBet = answerBets.FirstOrDefault(x => x.Snapshot.MemberId == answerBet.Snapshot.MemberId);
        if (oldAnswerBet is not null)
            answerBets.Remove(oldAnswerBet);
        answerBets.Add(answerBet);
        domainEventsAccessor.Add(answerBet.Events);
        return Task.CompletedTask;
    }

    public Task<IEnumerable<AnswerBet>> GetAnswersAsync(BetId betId)
    {
        return Task.FromResult(answerBets.Where(x => x.Snapshot.BetId == betId.Value));
    }

    internal IEnumerable<AnswerBetSnapshot> Answers { get => answerBets.Select(x => x.Snapshot); }
}
