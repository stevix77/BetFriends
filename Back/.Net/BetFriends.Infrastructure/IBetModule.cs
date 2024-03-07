using BetFriends.Application.Abstractions.Command;

namespace BetFriends.Infrastructure;

public interface IBetModule 
{
    Task ExecuteAsync(ICommand command);
}
