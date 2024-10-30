using BetFriends.Features.Friends;
using BetFriends.Features.Bets.CreateBet;
using BetFriends.Features.Bets.RetrieveBets;

namespace BetFriend
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(FriendsPage), typeof(FriendsPage));
            Routing.RegisterRoute(nameof(BetPage), typeof(BetPage));
            Routing.RegisterRoute(nameof(RetrieveBetsPage), typeof(RetrieveBetsPage));
            Routing.RegisterRoute(nameof(SelectFriendsPage), typeof(SelectFriendsPage));
            Routing.RegisterRoute(nameof(MainPage), typeof(MainPage));
        }
    }
}
