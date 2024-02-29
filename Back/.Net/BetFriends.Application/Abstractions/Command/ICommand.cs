using MediatR;

namespace BetFriends.Application.Abstractions.Command;
public interface ICommand : IRequest;

public interface ICommandHandler<T> : IRequestHandler<T> where T : ICommand;
