using BetFriends.Domain.Features.RetrieveProof;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using MediatR;

namespace BetFriends.Features.Bets.ProofBet;

public partial class ProofViewModel(IMediator mediator) : ObservableObject
{
    private readonly IMediator mediator = mediator;

    [ObservableProperty]
    private ImageSource proof;
    public string BetId { get; internal set; }

    [RelayCommand]
    private async Task Close()
    {
        await Shell.Current.Navigation.PopModalAsync();
    }
    internal async Task LoadProof()
    {
        var image = await mediator.Send(new RetrieveProofRequest(BetId));
        if (image != null)
        {
            using MemoryStream imageDecodeStream = new(image);
            Proof = ImageSource.FromStream(() => imageDecodeStream);
        }
    }
}
