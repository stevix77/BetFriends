namespace BetFriends.Infrastructure.UoW;

internal interface IUnitOfWork
{
    Task Begin();
    Task Commit();
    Task Rollback();
}
