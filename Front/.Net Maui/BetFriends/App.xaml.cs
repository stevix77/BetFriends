using BetFriends.Domain.Features.SignIn;
using BetFriends.Features.Auth.Signin;
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
            InitializeComponent();
            this.serviceProvider = serviceProvider;
        }

        protected override Window CreateWindow(IActivationState activationState)
        {
            var data = SecureStorage.Default.GetAsync("auth_token").Result;
            MainPage = serviceProvider.GetRequiredService<SigninPage>();
            return base.CreateWindow(activationState);
        }
    }
}
