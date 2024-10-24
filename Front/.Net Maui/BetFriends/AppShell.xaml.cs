using BetFriends.Features.Friends;
using BetFriends.Features.Bets.CreateBet;

namespace BetFriend
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(FriendsPage), typeof(FriendsPage));
            Routing.RegisterRoute(nameof(BetPage), typeof(BetPage));
            Routing.RegisterRoute(nameof(SelectFriendsPage), typeof(SelectFriendsPage));
            Routing.RegisterRoute(nameof(MainPage), typeof(MainPage));
        }
    }
}
