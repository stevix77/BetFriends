using MediatR;

namespace BetFriends.Shared.Application.Abstractions.Messaging;

public interface IQuery<out T> : IRequest<T>;

public interface IQueryHandler<in T, TOut> : IRequestHandler<T, TOut> where T : IQuery<TOut> where TOut : class;