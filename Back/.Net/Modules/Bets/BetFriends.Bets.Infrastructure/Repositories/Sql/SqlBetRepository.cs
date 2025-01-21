using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Domain;
using BetFriends.Shared.Infrastructure.Event;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql;

public class SqlBetRepository(BetContext betContext, DomainEventsAccessor domainEventsAccessor) : IBetRepository
{
    private readonly BetContext betContext = betContext;
    private readonly DomainEventsAccessor domainEventsAccessor = domainEventsAccessor;

    public async Task<Bet> GetByIdAsync(BetId betId)
    {
        var betEntity = await betContext.Bets.FindAsync(betId.Value);
        if (betEntity == null)
            return default!;
        return Bet.CreateFromEntity(betEntity.Id,
                                    betEntity.BettorId,
                                    betEntity.Description,
                                    betEntity.Coins,
                                    betEntity.EndDate,
                                    betEntity.Guests,
                                    betEntity.MaxAnswerDate,
                                    betEntity.IsSuccessful);
    }

    public BetEntity? GetEntity(Guid betId)
    {
        return betContext.Bets.Find(betId);
    }

    public async Task SaveAsync(Bet bet)
    {
        var entity = new BetEntity(bet);
        await betContext.AddAsync(entity);
        domainEventsAccessor.Add(bet.Events);
    }

    public void SaveEntity(BetEntity betEntity)
    {
        betContext.Add(betEntity);
    }
}
