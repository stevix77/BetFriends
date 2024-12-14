using BetFriend.Infrastructure;
using BetFriends.Blazor.Services;
using BetFriends.Domain.Abstractions;
using CommunityToolkit.Maui;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace BetFriends.Blazor;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseMauiCommunityToolkit()
            .UseMauiCommunityToolkitMediaElement()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
            });

        using var stream = Assembly.GetExecutingAssembly()
                                   .GetManifestResourceStream("BetFriends.Blazor.appsettings.json");
        var config = new ConfigurationBuilder()
                    .AddJsonStream(stream!)
                    .Build();
        builder.Configuration.AddConfiguration(config);
        builder.Services.AddMauiBlazorWebView();
        builder.Services.AddBlazorBootstrap();
#if DEBUG
        builder.Services.AddBlazorWebViewDeveloperTools();
		builder.Logging.AddDebug();
#endif
        builder.Services.AddScoped<AuthenticationService>();
        builder.Services.AddScoped<IUserContext>(x => new UserContext(Guid.NewGuid().ToString()));
        builder.Services.AddScoped<Services.Abstractions.INavigation, Navigation>();
        builder.Services.AddInfrastructure(x => x.GetRequiredService<IUserContext>());
        builder.Services.AddViewModels();
        builder.Services.AddPresenters();
        return builder.Build();
    }
}
