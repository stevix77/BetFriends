namespace BetFriends.Features.Bets.CreateBet;

public partial class SelectFriendsPage : ContentPage
{
	public SelectFriendsPage(CreateBetViewModel createBetViewModel)
	{
		InitializeComponent();
		BindingContext = createBetViewModel;
	}
}