using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Event;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql;

internal class SqlBetRepository(BetContext betContext, DomainEventsAccessor domainEventsAccessor) : IBetRepository
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

    public async Task SaveAsync(Bet bet)
    {
        var entity = new BetEntity(bet);
        await betContext.AddAsync(entity);
        domainEventsAccessor.Add(bet.Events);
    }
}
