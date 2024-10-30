using BetFriends.Domain.Features.RetrieveBets;
using CommunityToolkit.Mvvm.ComponentModel;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Features.Bets.RetrieveBets;

public partial class RetrieveBetsViewModel(IMediator mediator) : ObservableObject
{
    private readonly IMediator mediator = mediator;

    [ObservableProperty]
    private ObservableCollection<RetrieveBetItem> bets = [];

    internal async Task LoadAsync()
    {
        var query = new RetrieveBetsQuery();
        var bets = await mediator.Send(query);
        Bets = new(bets.Select(x => new RetrieveBetItem(x.BetId,
                                                        x.Description.Length > 20 ? x.Description[..20] : x.Description,
                                                        x.Chips,
                                                        x.EndDate,
                                                        x.OwnerId,
                                                        x.OwnerName)));
    }
}

public record RetrieveBetItem(Guid BetId, string Description, int Chips, DateTime EndDate, Guid OwnerId, string OwnerName)
{
    public string FormattedEndDate { get => EndDate.ToLongDateString(); }
}