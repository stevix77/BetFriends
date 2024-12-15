namespace BetFriends.Shared.Infrastructure.UoW;

public interface IUnitOfWork
{
    Task Begin();
    Task Commit();
    Task Rollback();
}
