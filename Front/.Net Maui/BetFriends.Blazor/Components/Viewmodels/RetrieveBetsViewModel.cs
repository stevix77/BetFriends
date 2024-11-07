using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Blazor.Components.Viewmodels;

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

    public ObservableCollection<BetDto> Bets { get; private set; } = [];

    [RelayCommand]
    private Task Accept(Guid betId)
    {
        var bet = Bets.First(x => x.BetId == betId);
        bet.Answer = true;
        bet.AcceptedCount++;
        return Task.CompletedTask;
    }

    [RelayCommand]
    private Task Reject(Guid betId)
    {
        var bet = Bets.First(x => x.BetId == betId);
        bet.Answer = false;
        bet.AcceptedCount--;
        return Task.CompletedTask;
    }

    internal async Task LoadAsync()
    {
        var query = new RetrieveBetsQuery();
        var bets = await mediator.Send(query);
        Bets = new (bets.Select(x => new BetDto(x.BetId,
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

public partial class BetDto(Guid betId,
                                  string description,
                                  int coins,
                                  DateTime endDate,
                                  Guid bookieId,
                                  string bookieName,
                                  int invitedCount) : ObservableObject
{

    public BetDto(Guid betId,
                                  string description,
                                  int coins,
                                  DateTime endDate,
                                  Guid bookieId,
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
    public Guid BetId { get; } = betId;
    public string Description { get; } = description;
    public int Coins { get; } = coins;
    public DateTime EndDate { get; } = endDate;
    public Guid BookieId { get; } = bookieId;
    public string BookieName { get; } = bookieName;
    public int InvitedCount { get; } = invitedCount;
    public string FormattedEndDate { get => EndDate.ToLongDateString(); }
    [ObservableProperty]
    private int acceptedCount;
    [ObservableProperty]
    private bool? answer;
}