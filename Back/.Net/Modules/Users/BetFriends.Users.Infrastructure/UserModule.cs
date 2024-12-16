﻿using BetFriends.Shared.Application.Abstractions.Messaging;
using BetFriends.Users.Application.Abstractions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Users.Infrastructure;

public class UserModule : IUserModule
{
    public Task<T> ExecuteAsync<T>(IQuery<T> query)
    {
        using IServiceScope scope = UserCompositionRoot.BeginScope();
        var mediator = scope.ServiceProvider.GetService(typeof(IMediator)) as IMediator;
        return mediator!.Send(query);
    }
}
