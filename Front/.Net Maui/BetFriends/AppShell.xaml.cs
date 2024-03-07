using BetFriends.Features.Friends;

namespace BetFriend
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(FriendsPage), typeof(FriendsPage));
            Routing.RegisterRoute(nameof(MainPage), typeof(MainPage));
        }
    }
}
