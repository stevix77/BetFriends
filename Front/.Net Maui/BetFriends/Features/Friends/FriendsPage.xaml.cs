namespace BetFriends.Features.Friends;

public partial class FriendsPage : ContentPage
{
	public FriendsPage(FriendsViewModel friendsViewModel)
	{
		InitializeComponent();
		BindingContext = friendsViewModel;
	}
}