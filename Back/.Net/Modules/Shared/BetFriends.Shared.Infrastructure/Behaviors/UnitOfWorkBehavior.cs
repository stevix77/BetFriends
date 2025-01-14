﻿using BetFriends.Shared.Infrastructure.UoW;
using MediatR;

namespace BetFriends.Shared.Infrastructure.Behaviors;

public class UnitOfWorkBehavior<TRequest, TResponse>(IUnitOfWork unitOfWork) : IPipelineBehavior<TRequest, TResponse>
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        try
        {
            await unitOfWork.Begin();
            var result = await next();
            await unitOfWork.Commit();
            return result;
        }
        catch (Exception)
        {
            await unitOfWork.Rollback();
            throw;
        }
    }
}
