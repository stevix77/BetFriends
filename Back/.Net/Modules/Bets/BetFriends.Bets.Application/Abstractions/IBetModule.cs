using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Bets.Application.Abstractions;

public interface IBetModule
{
    Task ExecuteAsync(ICommand command);
    Task<T> ExecuteAsync<T>(IQuery<T> query);
}
