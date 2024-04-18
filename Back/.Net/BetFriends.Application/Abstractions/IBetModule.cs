using BetFriends.Application.Abstractions.Command;

namespace BetFriends.Application.Abstractions;

public interface IBetModule 
{
    Task ExecuteAsync(ICommand command);
}
