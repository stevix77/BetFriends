using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Users.Application.Abstractions;

public interface IUserModule
{
    Task<T> ExecuteAsync<T>(IQuery<T> query);
}
