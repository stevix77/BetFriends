using BetFriends.Bets.Domain.Friends;
using BetFriends.Bets.Domain.Friendships;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Event;

namespace BetFriends.Bets.Infrastructure.Repositories.Sql;

public class SqlFriendshipRepository(BetContext betContext,
                                        DomainEventsAccessor domainEventsAccessor) : IFriendshipRepository
{
    private readonly BetContext betContext = betContext;
    private readonly DomainEventsAccessor domainEventsAccessor = domainEventsAccessor;

    public async Task SaveAsync(Friendship friendship)
    {
        var entity = new FriendshipEntity(friendship);
        await betContext.AddAsync(entity);
        domainEventsAccessor.Add(friendship.Events);
    }
}
