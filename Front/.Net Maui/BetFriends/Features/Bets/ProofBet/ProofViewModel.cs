using BetFriends.Domain.Features.RetrieveProof;
using CommunityToolkit.Mvvm.ComponentModel;
using MediatR;

namespace BetFriends.Features.Bets.ProofBet;

public partial class ProofViewModel(IMediator mediator) : ObservableObject
{
    private readonly IMediator mediator = mediator;

    [ObservableProperty]
    private ImageSource proof;
    public string BetId { get; internal set; }

    internal async Task LoadProof()
    {
        var image = await mediator.Send(new RetrieveProofRequest(BetId));
        if (image != null)
        {
            MemoryStream imageDecodeStream = new(image);
            Proof = ImageSource.FromStream(() => imageDecodeStream);
        }
    }
}
