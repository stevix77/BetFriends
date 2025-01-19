using BetFriends.Shared.Infrastructure.Event;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Users.Infrastructure.Repositories.Sql;

public class SqlUserRepository(UserContext userContext,
                                 DomainEventsAccessor domainEventsAccessor) : IUserRepository
{
    private readonly UserContext userContext = userContext;
    private readonly DomainEventsAccessor domainEventsAccessor = domainEventsAccessor;

    public Task<UserEntity?> GetEntityById(Guid id)
    {
        return userContext.Users.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<bool> IsUserExistAsync(string username, string email)
    {
        var entity = await userContext.Users.FirstOrDefaultAsync(x => x.Username == username ||
                                                                    x.Email == email);
        return entity != null;
    }

    public async Task SaveAsync(User user)
    {
        var entity = new UserEntity(user.Snapshot);
        await userContext.Users.AddAsync(entity);
        domainEventsAccessor.Add(user.Events);
    }

    public void SaveEntity(UserEntity entity)
    {
        userContext.Users.Add(entity);
        userContext.SaveChanges();
    }
}
