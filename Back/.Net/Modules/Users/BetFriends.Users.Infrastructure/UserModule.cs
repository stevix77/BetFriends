using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Users.Application.Abstractions;
using MediatR;

namespace BetFriends.Users.Infrastructure;

public class UserModule : IUserModule
{
    public async Task<T> ExecuteAsync<T>(IQuery<T> query)
    {
        var scope = UserCompositionRoot.BeginScope();
        var mediator = scope.ServiceProvider.GetService(typeof(IMediator)) as IMediator;
        var result = await mediator!.Send(query);
        scope.Dispose();
        return result;
    }

    public async Task ExecuteAsync(ICommand command)
    {
        var scope = UserCompositionRoot.BeginScope();
        var mediator = scope.ServiceProvider.GetService(typeof(IMediator)) as IMediator;
        await mediator!.Send(command);
        scope.Dispose();
    }

    public async Task ExecuteNotificationAsync(INotification notification)
    {
        var scope = UserCompositionRoot.BeginScope();
        var mediator = scope.ServiceProvider.GetService(typeof(IMediator)) as IMediator;
        await mediator!.Publish(notification);
        scope.Dispose();
    }
}
