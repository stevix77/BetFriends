using BetFriends.Domain.Bets;
using BetFriends.Infrastructure.Repositories.Sql.DataAccess;

namespace BetFriends.Infrastructure.Repositories.Sql;

internal class SqlBetRepository : IBetRepository
{
    private readonly BetContext betContext;

    public SqlBetRepository(BetContext betContext)
    {
        this.betContext = betContext;
    }
    public async Task<Bet> GetByIdAsync(BetId betId)
    {
        var betEntity = await betContext.Bets.FindAsync(betId.Value);
        if (betEntity == null)
            return default!;
        return Bet.CreateFromEntity(betEntity.Id,
                                    betEntity.OwnerId,
                                    betEntity.Description,
                                    betEntity.Chips,
                                    betEntity.EndDate,
                                    betEntity.Friends);
    }

    public async Task SaveAsync(Bet bet)
    {
        var entity = new BetEntity(bet);
        await betContext.AddAsync(entity);
    }
}
