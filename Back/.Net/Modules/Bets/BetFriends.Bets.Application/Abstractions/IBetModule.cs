using BetFriends.Shared.Application.Abstractions.Messaging;
using MediatR;

namespace BetFriends.Bets.Application.Abstractions;

public interface IBetModule
{
    Task ExecuteAsync(ICommand command);
    Task<T> ExecuteAsync<T>(IQuery<T> query);
    Task ExecuteNotificationAsync(INotification notification);
}
