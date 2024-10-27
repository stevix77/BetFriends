using BetFriends.Application.Abstractions.Messaging;

namespace BetFriends.Application.Abstractions;

public interface IBetModule 
{
    Task ExecuteAsync(ICommand command);
    Task<T> ExecuteAsync<T>(IQuery<T> query);
}
