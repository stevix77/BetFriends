namespace BetFriends.Features.Bets.ProofBet;

[XamlCompilation(XamlCompilationOptions.Compile)]
[QueryProperty(nameof(BetId), "betid")]
public partial class ProofPage : ContentPage
{
	public ProofPage(ProofViewModel proofViewModel)
	{
		InitializeComponent();
		BindingContext = proofViewModel;

    }

    public string BetId
    {
        set
        {
            (BindingContext as ProofViewModel).BetId = value;
        }
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await (BindingContext as ProofViewModel).LoadProof();
    }
}