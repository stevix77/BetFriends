namespace BetFriends.Features.Friends;

public partial class FriendsPage : ContentPage
{
	public FriendsPage(FriendsViewModel friendsViewModel)
	{
		InitializeComponent();
		BindingContext = friendsViewModel;
	}

    protected override async void OnAppearing()
    {
		await (BindingContext as FriendsViewModel).LoadAsync();
        base.OnAppearing();
    }
}