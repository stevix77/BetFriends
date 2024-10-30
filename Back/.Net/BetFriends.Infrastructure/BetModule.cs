using BetFriends.Application.Abstractions;
using BetFriends.Application.Abstractions.Messaging;
using MediatR;

namespace BetFriends.Infrastructure;

internal class BetModule(IMediator mediator) : IBetModule
{
    public Task ExecuteAsync(ICommand command)
    {
        return mediator.Send(command);
    }

    public Task<T> ExecuteAsync<T>(IQuery<T> query)
    {
        return mediator.Send(query);
    }
}
