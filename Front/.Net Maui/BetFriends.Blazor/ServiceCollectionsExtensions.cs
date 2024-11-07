using BetFriends.Blazor.Components.Viewmodels;
using BetFriends.Blazor.Presenters;
using BetFriends.Blazor.Services;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.CreateBet;

namespace BetFriends.Blazor;

internal static class ServiceCollectionsExtensions
{
    public static IServiceCollection AddViewModels(this IServiceCollection services)
    {
        services.AddScoped<RetrieveBetsViewModel>();
        services.AddScoped<CreateBetViewModel>();

        services.AddScoped<IDateTimeProvider, DateTimeProvider>();

        return services;
    }

    public static IServiceCollection AddPresenters(this IServiceCollection services)
    {
        services.AddScoped<ICreateBetOutputPort, CreateBetPresenter>();

        return services;
    }
}
