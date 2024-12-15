using MediatR;

namespace BetFriends.Shared.Application.Abstractions.Messaging;
public interface ICommand : IRequest;

public interface ICommandHandler<T> : IRequestHandler<T> where T : ICommand;
