namespace BetFriends.Features.Bets.RetrieveBets;

public partial class RetrieveBetsPage : ContentPage
{

    public RetrieveBetsPage(RetrieveBetsViewModel retrieveBetsViewModel)
	{
		InitializeComponent();
        BindingContext = retrieveBetsViewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await (BindingContext as RetrieveBetsViewModel).LoadAsync();
    }
}