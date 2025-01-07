using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Event;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql;

internal class SqlAnswerRepository(BetContext betContext, DomainEventsAccessor domainEventsAccessor) : IAnswerBetRepository
{
    private readonly BetContext betContext = betContext;
    private readonly DomainEventsAccessor domainEventsAccessor = domainEventsAccessor;

    public Task<IEnumerable<AnswerBet>> GetAnswersAsync(BetId betId)
    {
        var answersEntity = betContext.Answers.Where(x => x.BetId == betId.Value);
        var answers = answersEntity.Select(x => AnswerBet.FromSnapshot(new AnswerBetSnapshot(x.BetId,
                                                                                            x.MemberId,
                                                                                            x.Answer)));
        return Task.FromResult<IEnumerable<AnswerBet>>(answers);
    }

    public async Task SaveAsync(AnswerBet answerBet)
    {
        var entity = new AnswerEntity(answerBet);
        await betContext.AddAsync(entity);
        domainEventsAccessor.Add(answerBet.Events);
    }
}
