using BetFriend.Domain.Features.AddFriend;
using BetFriend.Infrastructure;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Features.Bets.CreateBet;
using BetFriends.Features.Bets.RetrieveBets;
using BetFriends.Features.Friends;
using BetFriends.Infrastructure;
using BetFriends.Services;
using CommunityToolkit.Maui;
using CommunityToolkit.Maui.Markup;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace BetFriend
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .UseMauiCommunityToolkit()
                .UseMauiCommunityToolkitMarkup()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                    fonts.AddFont("UIFontIcons.ttf", "UIFontIcons");
                    fonts.AddFont("materialdesignicons-webfont.ttf", "MaterialDesignIcons");
                });

            using var stream = Assembly.GetExecutingAssembly()
                                       .GetManifestResourceStream("BetFriends.appsettings.json");

            var config = new ConfigurationBuilder()
                        .AddJsonStream(stream!)
                        .Build();
            builder.Configuration.AddConfiguration(config);

#if DEBUG
            builder.Logging.AddDebug();
#endif

            builder.Services.AddScoped<BetPage>();
            builder.Services.AddScoped<FriendsPage>();
            builder.Services.AddScoped<SelectFriendsPage>();
            builder.Services.AddScoped<RetrieveBetsPage>();
            builder.Services.AddScoped<IAddFriendOutputPort, AddFriendPresenter>();
            builder.Services.AddScoped<ICreateBetOutputPort, CreateBetPresenter>();
            builder.Services.AddScoped<FriendsViewModel>();
            builder.Services.AddScoped<CreateBetViewModel>();
            builder.Services.AddScoped<RetrieveBetsViewModel>();
            builder.Services.AddInfrastructure();
            return builder.Build();
        }
    }
}
