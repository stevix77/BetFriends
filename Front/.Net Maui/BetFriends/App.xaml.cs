using CommunityToolkit.Maui.Alerts;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriend
{
    public partial class App : Application
    {
        public App()
        {
            WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, Exception>(async (o, e) =>
            {
                await Toast.Make("Une erreur est survenue").Show();
            }));
            InitializeComponent();

            MainPage = new AppShell();
        }
    }
}
