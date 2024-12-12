using BetFriends;
using BetFriends.Domain.Features.SignIn;
using BetFriends.Features.Auth.Signin;
using BetFriends.Services;
using CommunityToolkit.Maui.Alerts;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriend
{
    public partial class App : Application
    {
        private readonly IServiceProvider serviceProvider;

        public App(IServiceProvider serviceProvider)
        {
            WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, Exception>(async (o, e) =>
            {
                await Toast.Make("Une erreur est survenue").Show();
            }));
            WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, Authentication>((o, e) =>
            {
                MainPage = new AppShell();
            }));
            WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, SignOffRequest>((o, e) =>
            {
                MainPage = new SigninPage(serviceProvider.GetRequiredService<SigninViewModel>());
            }));
            InitializeComponent();
            this.serviceProvider = serviceProvider;
        }

        protected override Window CreateWindow(IActivationState activationState)
        {
            var authenticationService = serviceProvider.GetRequiredService<AuthenticationService>();
            authenticationService.Load();
            if (!authenticationService.IsConnected())
                MainPage = new SigninPage(serviceProvider.GetRequiredService<SigninViewModel>());
            else
                MainPage = new AppShell();
            return base.CreateWindow(activationState);
        }
    }
}
