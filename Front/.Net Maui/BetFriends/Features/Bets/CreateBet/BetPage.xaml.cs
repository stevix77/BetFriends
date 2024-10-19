namespace BetFriends.Features.Bets.CreateBet;

public partial class BetPage : ContentPage
{
	public BetPage(CreateBetViewModel createBetViewModel)
	{
		InitializeComponent();
		createBetViewModel.LoadFriendsAsync();
		BindingContext = createBetViewModel;
	}

    protected override void OnAppearing()
    {
        (BindingContext as CreateBetViewModel).Init();
        base.OnAppearing();
    }
}