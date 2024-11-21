namespace BetFriends.Features.Bets.CompleteBet;

[XamlCompilation(XamlCompilationOptions.Compile)]
[QueryProperty(nameof(BetId), "betid")]
public partial class CompleteBetPage : ContentPage
{
	public CompleteBetPage(CompleteBetViewModel completeBetViewModel)
	{
		InitializeComponent();
        BindingContext = completeBetViewModel;
	}

    public string BetId
    {
        set
        {
            (BindingContext as CompleteBetViewModel).BetId = value;
        }
    }
}