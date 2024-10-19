using BetFriends.Application.Abstractions;
using BetFriends.Application.Abstractions.Command;
using MediatR;

namespace BetFriends.Infrastructure;

internal class BetModule(IMediator mediator) : IBetModule
{
    public async Task ExecuteAsync(ICommand command)
    {
        await mediator.Send(command);
    }
}
