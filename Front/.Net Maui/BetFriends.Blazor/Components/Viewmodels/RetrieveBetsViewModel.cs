using BetFriends.Blazor.Presenters;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.AnswerBet;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveBets;
using BlazorBootstrap;
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
    private readonly IDateTimeProvider dateTimeProvider;
    private readonly Services.Abstractions.INavigation navigation;

    public RetrieveBetsViewModel(IMediator mediator,
                                 IUserContext userContext,
                                 IDateTimeProvider dateTimeProvider)
    {
        this.mediator = mediator;
        this.userContext = userContext;
        this.dateTimeProvider = dateTimeProvider;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, AnswerBetResponse>((o, e) =>
        {
            ValidateAnswer(e);
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, AnswerBetError>((o, e) =>
        {
            Errors.Add(new ToastMessage(ToastType.Danger, "Erreur", e.Message));
        }));
        this.navigation = navigation;
    }

    public List<ToastMessage> Errors { get; } = new List<ToastMessage>();

    private void ValidateAnswer(AnswerBetResponse e)
    {
        var bet = Bets.First(x => x.BetId == e.BetId);
        if(bet.Answer is null)
        {
            bet.AcceptedCount += e.Answer ? 1 : 0;
            bet.Answer = e.Answer;
            return;
        }
        bet.AcceptedCount += e.Answer ? 1 : -1;
        bet.Answer = e.Answer;
    }

    public ObservableCollection<BetDto> Bets { get; private set; } = [];

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

    [RelayCommand]
    private void Complete(string betId)
    {
        navigation.Navigate($"/complete/{betId}");
    }

    internal async Task LoadAsync()
    {
        var query = new RetrieveBetsQuery();
        var bets = await mediator.Send(query);
        Bets = new (bets.Select(x => new BetDto(x.BetId,
                                                        x.Description,
                                                        x.Coins,
                                                        x.EndDate,
                                                        x.MaxAnswerDate,
                                                        CanAnswer(x),
                                                        x.BookieId == userContext.UserId && !x.IsSuccess.HasValue,
                                                        x.BookieId,
                                                        x.BookieName,
                                                        x.Gamblers.Count(),
                                                        x.Gamblers.Count(y => y.HasAccepted == true),
                                                        x.Gamblers.FirstOrDefault(y => y.Id == userContext.UserId)?.HasAccepted,
                                                        x.IsSuccess,
                                                        x.IsSuccess == null ? null : GetResult(x.IsSuccess.Value, x.BookieId)  )));
    }

    private bool CanAnswer(RetrieveBetsItemResponse bet)
        => bet.Gamblers.Any(x => x.Id == userContext.UserId) &&
            bet.MaxAnswerDate > dateTimeProvider.GetCurrentDate();

    private string GetResult(bool isSuccess, string bookieId)
    {
        if (bookieId == userContext.UserId)
            return isSuccess ? "Win" : "Lose";
        return isSuccess ? "Lose" : "Win";
    }
}

public partial class BetDto(string betId,
                                  string description,
                                  int coins,
                                  DateTime endDate,
                                  DateTime maxAnswerDate,
                                  bool canAnswer,
                                  bool canClose,
                                  string bookieId,
                                  string bookieName,
                                  int invitedCount,
                                  bool? isSuccess,
                                  string? result) : ObservableObject
{

    public BetDto(string betId,
                string description,
                int coins,
                DateTime endDate,
                DateTime maxAnswerDate,
                bool canAnswer,
                bool canClose,
                string bookieId,
                string bookieName,
                int invitedCount,
                int acceptedCount,
                bool? answer,
                bool? isSuccess,
                string? result) : this(betId,
                                    description,
                                    coins,
                                    endDate,
                                    maxAnswerDate,
                                    canAnswer,
                                    canClose,
                                    bookieId,
                                    bookieName,
                                    invitedCount,
                                    isSuccess,
                                    result)
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
    public bool? IsSuccess { get; } = isSuccess;
    public string? Result { get; } = result;
    public bool CanClose { get; } = canClose;
    [ObservableProperty]
    private int acceptedCount;
    [ObservableProperty]
    private bool? answer;
}