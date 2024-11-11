﻿using BetFriend.Domain.Features.AddFriend;
using BetFriends.Blazor.Components.Viewmodels;
using BetFriends.Blazor.Presenters;
using BetFriends.Blazor.Services;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.AnswerBet;
using BetFriends.Domain.Features.CreateBet;

namespace BetFriends.Blazor;

internal static class ServiceCollectionsExtensions
{
    public static IServiceCollection AddViewModels(this IServiceCollection services)
    {
        services.AddScoped<RetrieveBetsViewModel>();
        services.AddScoped<CreateBetViewModel>();
        services.AddScoped<FriendsViewModel>();

        services.AddScoped<IDateTimeProvider, DateTimeProvider>();

        return services;
    }

    public static IServiceCollection AddPresenters(this IServiceCollection services)
    {
        services.AddScoped<ICreateBetOutputPort, CreateBetPresenter>();
        services.AddScoped<IAnswerBetOutputPort, AnswerBetPresenter>();
        services.AddScoped<IAddFriendOutputPort, AddFriendPresenter>();

        return services;
    }
}