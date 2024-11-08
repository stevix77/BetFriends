using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Features.Bets.RetrieveBets;

public partial class RetrieveBetsViewModel : ObservableObject
{
    private readonly IMediator mediator;
    private readonly IUserContext userContext;

    public RetrieveBetsViewModel(IMediator mediator, IUserContext userContext)
    {
        this.mediator = mediator;
        this.userContext = userContext;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, CreateBetResponse>((o, e) =>
        {

        }));
    }

    [ObservableProperty]
    private ObservableCollection<BetDto> bets = [];

    internal async Task LoadAsync()
    {
        var query = new RetrieveBetsQuery();
        var bets = await mediator.Send(query);
        Bets = new(bets.Select(x => new BetDto(x.BetId,
                                                        x.Description,
                                                        x.Coins,
                                                        x.EndDate,
                                                        x.BookieId,
                                                        x.BookieName,
                                                        x.Gamblers.Count(),
                                                        x.Gamblers.Count(y => y.HasAccepted == true),
                                                        x.Gamblers.FirstOrDefault(y => y.Id == userContext.UserId)?.HasAccepted)));
    }
}

public partial class BetDto(string betId,
                                  string description,
                                  int coins,
                                  DateTime endDate,
                                  string bookieId,
                                  string bookieName,
                                  int invitedCount) : ObservableObject
{

    public BetDto(string betId,
                string description,
                int coins,
                DateTime endDate,
                string bookieId,
                string bookieName,
                int invitedCount,
                int acceptedCount,
                bool? answer) : this(betId,
                                    description,
                                    coins,
                                    endDate,
                                    bookieId,
                                    bookieName,
                                    invitedCount)
    {
        this.acceptedCount = acceptedCount;
        this.answer = answer;
    }
    public string BetId { get; } = betId;
    public string Description { get; } = description;
    public int Coins { get; } = coins;
    public DateTime EndDate { get; } = endDate;
    public string BookieId { get; } = bookieId;
    public string BookieName { get; } = bookieName;
    public int InvitedCount { get; } = invitedCount;
    public string FormattedEndDate { get => EndDate.ToLongDateString(); }
    [ObservableProperty]
    private int acceptedCount;
    [ObservableProperty]
    private bool? answer;
}