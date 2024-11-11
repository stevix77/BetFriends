using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.AnswerBet;
using BetFriends.Domain.Features.RetrieveBets;
using CommunityToolkit.Maui.Alerts;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Features.Bets.RetrieveBets;

public partial class RetrieveBetsViewModel : ObservableObject
{
    private readonly IMediator mediator;
    private readonly IUserContext userContext;
    private readonly IDateTimeProvider dateTimeProvider;

    public RetrieveBetsViewModel(IMediator mediator, IUserContext userContext, IDateTimeProvider dateTimeProvider)
    {
        this.mediator = mediator;
        this.userContext = userContext;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, AnswerBetResponse>((o, e) =>
        {
            ValidateAnswer(e);
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, AnswerBetError>(async (o, e) =>
        {
            await Toast.Make(e.Message).Show();
        }));
        this.dateTimeProvider = dateTimeProvider;
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
                                                        x.MaxAnswerDate,
                                                        x.MaxAnswerDate > dateTimeProvider.GetCurrentDate(),
                                                        x.BookieId,
                                                        x.BookieName,
                                                        x.Gamblers.Count(),
                                                        x.Gamblers.Count(y => y.HasAccepted == true),
                                                        x.Gamblers.FirstOrDefault(y => y.Id == userContext.UserId)?.HasAccepted)));
    }

    [RelayCommand]
    private async Task Accept(string betId)
    {
        var bet = Bets.First(x => x.BetId == betId);
        await mediator.Send(new AnswerBetRequest(true, betId, bet.BookieId, bet.EndDate, bet.Answer));
    }

    [RelayCommand]
    private async Task Reject(string betId)
    {
        var bet = Bets.First(x => x.BetId == betId);
        await mediator.Send(new AnswerBetRequest(false, betId, bet.BookieId, bet.EndDate, bet.Answer));
    }

    private void ValidateAnswer(AnswerBetResponse e)
    {
        var bet = Bets.First(x => x.BetId == e.BetId);
        if (bet.Answer is null)
        {
            bet.AcceptedCount += e.Answer ? 1 : 0;
            bet.Answer = e.Answer;
            return;
        }
        bet.AcceptedCount += e.Answer ? 1 : -1;
        bet.Answer = e.Answer;
    }
}

public partial class BetDto(string betId,
                                  string description,
                                  int coins,
                                  DateTime endDate,
                                  DateTime maxAnswerDate,
                                  bool canAnswer,
                                  string bookieId,
                                  string bookieName,
                                  int invitedCount) : ObservableObject
{

    public BetDto(string betId,
                string description,
                int coins,
                DateTime endDate,
                DateTime maxAnswerDate,
                bool canAnswer,
                string bookieId,
                string bookieName,
                int invitedCount,
                int acceptedCount,
                bool? answer) : this(betId,
                                    description,
                                    coins,
                                    endDate,
                                    maxAnswerDate,
                                    canAnswer,
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
    public DateTime MaxAnswerDate { get; } = maxAnswerDate;
    public string BookieId { get; } = bookieId;
    public string BookieName { get; } = bookieName;
    public int InvitedCount { get; } = invitedCount;
    public string FormattedEndDate { get => EndDate.ToLongDateString(); }
    public bool CanAnswer { get; } = canAnswer;
    [ObservableProperty]
    private int acceptedCount;
    [ObservableProperty]
    private bool? answer;
}