using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Event;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql;

public class SqlAnswerRepository(BetContext betContext, DomainEventsAccessor domainEventsAccessor) : IAnswerBetRepository
{
    private readonly BetContext betContext = betContext;
    private readonly DomainEventsAccessor domainEventsAccessor = domainEventsAccessor;

    public Task<IEnumerable<AnswerBet>> GetAnswersAsync(BetId betId)
    {
        var answersEntity = betContext.Answers.Where(x => x.BetId == betId.Value);
        var answers = answersEntity.Select(x => AnswerBet.FromSnapshot(new AnswerBetSnapshot(x.BetId,
                                                                                            x.GamblerId,
                                                                                            x.Answer)));
        return Task.FromResult<IEnumerable<AnswerBet>>(answers);
    }

    public Task<AnswerEntity?> GetEntityById(Guid betId, Guid memberId)
    {
        return betContext.Answers.FindAsync(betId, memberId).AsTask();
    }

    public async Task SaveAsync(AnswerBet answerBet)
    {
        var entity = await betContext.FindAsync<AnswerEntity>(answerBet.Snapshot.BetId, answerBet.Snapshot.MemberId); 
        if(entity == null)
        {
            entity = new AnswerEntity(answerBet);
            await betContext.AddAsync(entity);
            domainEventsAccessor.Add(answerBet.Events);
            return;
        }
        entity.Update(answerBet.Snapshot);

    }

    public void SaveEntity(AnswerEntity entity)
    {
        betContext.Add(entity);
        betContext.SaveChanges();
    }
}
