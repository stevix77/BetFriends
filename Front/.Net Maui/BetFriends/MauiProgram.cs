using BetFriend.Domain.Features.AddFriend;
using BetFriend.Infrastructure;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.AnswerBet;
using BetFriends.Domain.Features.CompleteBet;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.SignIn;
using BetFriends.Features.Auth.Signin;
using BetFriends.Features.Bets.CompleteBet;
using BetFriends.Features.Bets.CreateBet;
using BetFriends.Features.Bets.ProofBet;
using BetFriends.Features.Bets.RetrieveBets;
using BetFriends.Features.Friends;
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
            builder.Services.AddScoped<CompleteBetPage>();
            builder.Services.AddScoped<ProofPage>();
            builder.Services.AddScoped<SigninPage>();
            builder.Services.AddScoped<IAddFriendOutputPort, AddFriendPresenter>();
            builder.Services.AddScoped<ICreateBetOutputPort, CreateBetPresenter>();
            builder.Services.AddScoped<IAnswerBetOutputPort, AnswerBetPresenter>();
            builder.Services.AddScoped<ICompleteBetOutputPort, CompleteBetPresenter>();
            builder.Services.AddScoped<ISignInOutputPort, SignInPresenter>();
            builder.Services.AddScoped<FriendsViewModel>();
            builder.Services.AddScoped<CreateBetViewModel>();
            builder.Services.AddScoped<CompleteBetViewModel>();
            builder.Services.AddScoped<RetrieveBetsViewModel>();
            builder.Services.AddScoped<ProofViewModel>();
            builder.Services.AddScoped<SigninViewModel>();
            builder.Services.AddScoped<AuthenticationService>();
            builder.Services.AddScoped<IUserContext>(x => new UserContext(Guid.NewGuid().ToString()));
            builder.Services.AddInfrastructure(x => x.GetRequiredService<IUserContext>());
            return builder.Build();
        }
    }
}
