using BetFriends.Shared.Application.Abstractions.Messaging;
using MediatR;

namespace BetFriends.Users.Application.Abstractions;

public interface IUserModule
{
    Task<T> ExecuteAsync<T>(IQuery<T> query);
    Task ExecuteAsync(ICommand command);
    Task ExecuteNotificationAsync(INotification integrationEvent);
}
