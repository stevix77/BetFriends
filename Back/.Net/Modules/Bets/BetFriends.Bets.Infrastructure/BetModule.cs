using BetFriends.Bets.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Bets.Infrastructure;

public class BetModule : IBetModule
{
    public Task<T> ExecuteAsync<T>(IQuery<T> query)
    {
        using IServiceScope scope = BetCompositionRoot.BeginScope();
        var mediator = scope.ServiceProvider.GetService(typeof(IMediator)) as IMediator;
        return mediator!.Send(query);
    }

    public Task ExecuteAsync(ICommand command)
    {
        using IServiceScope scope = BetCompositionRoot.BeginScope();
        var mediator = scope.ServiceProvider.GetService(typeof(IMediator)) as IMediator;
        return mediator!.Send(command);
    }

    public Task ExecuteNotificationAsync(INotification notification)
    {
        using IServiceScope scope = BetCompositionRoot.BeginScope();
        var mediator = scope.ServiceProvider.GetService(typeof(IMediator)) as IMediator;
        return mediator!.Publish(notification);
    }
}
