using BetFriends.Bets.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;
using MediatR;

namespace BetFriends.Bets.Infrastructure;

public class BetModule(IMediator mediator) : IBetModule
{
    private readonly IMediator mediator = mediator;

    public Task ExecuteAsync(ICommand command)
    {
        return mediator!.Send(command);
    }

    public Task<T> ExecuteAsync<T>(IQuery<T> query)
    {
        return mediator!.Send(query);
    }
}
