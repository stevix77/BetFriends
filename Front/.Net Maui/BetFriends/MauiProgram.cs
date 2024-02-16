using BetFriend.Infrastructure;
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

            builder.Services.AddInfrastructure();
            return builder.Build();
        }
    }
}
