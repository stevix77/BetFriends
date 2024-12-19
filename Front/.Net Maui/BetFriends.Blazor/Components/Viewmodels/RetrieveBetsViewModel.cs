using BetFriends.Blazor.Presenters;
using BetFriends.Blazor.Services;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.AnswerBet;
using BetFriends.Domain.Features.CompleteBet;
using BetFriends.Domain.Features.RetrieveBets;
using BetFriends.Domain.Features.RetrieveInfo;
using BetFriends.Domain.Features.RetrieveProof;
using BlazorBootstrap;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Blazor.Components.Viewmodels;

public partial class RetrieveBetsViewModel : ObservableObject
{
    private const string AcceptedText = "Accepté";
    private const string RejectText = "Refusé";
    private const string WinText = "Win";
    private const string LoseText = "Lose";
    private readonly IMediator mediator;
    private readonly IUserContext userContext;
    private readonly IDateTimeProvider dateTimeProvider;
    private readonly Services.Abstractions.INavigation navigation;

    public RetrieveBetsViewModel(IMediator mediator,
                                 IUserContext userContext,
                                 IDateTimeProvider dateTimeProvider,
                                 Services.Abstractions.INavigation navigation)
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
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, ProofMissingError>((o, e) =>
        {
            Errors.Add(new ToastMessage(ToastType.Danger, "Erreur", e.Message));
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, BetCompleted>((o, e) =>
        {
            UpdateBetCompleted(e.BetId, e.IsSuccess);
        }));
        var retrieveInfo = mediator.Send(new RetrieveInfoQuery());
        retrieveInfo.Wait();
        Data.SetInfo(retrieveInfo.Result.Username, retrieveInfo.Result.Coins);
        this.navigation = navigation;
    }

    [ObservableProperty]
    private bool? isSuccess;

    private string? betId;
    [ObservableProperty]
    private string? proof;
    [ObservableProperty]
    private string image;

    public List<ToastMessage> Errors { get; } = new List<ToastMessage>();

    internal async Task LoadProof(string betId, Modal proofModal)
    {
        var image = await mediator.Send(new RetrieveProofRequest(betId));
        if (image != null)
        {
            try
            {
                Image = $"data:image/png;base64, {Convert.ToBase64String(image)}";
                await proofModal.ShowAsync();
            }
            catch (Exception ex)
            {
                Errors.Add(new ToastMessage(ToastType.Danger, "Erreur", "Un problème est survenu"));
            }
        }
    }

    private void UpdateBetCompleted(string betId, bool isSuccess)
    {
        var bet = Bets.First(x => x.BetId == betId);
        bet.IsSuccess = isSuccess;
        bet.Result = GetResult(isSuccess, userContext.UserId);
        bet.CanClose = false;
    }

    private void ValidateAnswer(AnswerBetResponse e)
    {
        var bet = Bets.First(x => x.BetId == e.BetId);
        if (bet.Answer is null)
        {
            bet.AcceptedCount += e.Answer ? 1 : 0;
            bet.Answer = e.Answer ? AcceptedText : RejectText;
            return;
        }
        bet.AcceptedCount += e.Answer ? 1 : -1;
        bet.Answer = e.Answer ? AcceptedText : RejectText;
    }

    public ObservableCollection<BetDto> Bets { get; private set; } = [];

    [RelayCommand]
    private async Task Accept(string betId)
    {
        var bet = Bets.First(x => x.BetId == betId);
        await mediator.Send(new AnswerBetRequest(true,
                                                 betId,
                                                 bet.BookieId,
                                                 bet.EndDate,
                                                 RetrieveBetsViewModel.GetAnswer(bet.Answer)));
    }

    [RelayCommand]
    private async Task Reject(string betId)
    {
        var bet = Bets.First(x => x.BetId == betId);
        await mediator.Send(new AnswerBetRequest(false,
                                                 betId,
                                                 bet.BookieId,
                                                 bet.EndDate,
                                                 RetrieveBetsViewModel.GetAnswer(bet.Answer)));
    }

    [RelayCommand]
    private async Task Complete(Modal modal)
    {
        try
        {
            await mediator.Send(new CompleteBetRequest(betId!, IsSuccess.GetValueOrDefault(), Proof));
        }
        catch (Exception)
        {
            Errors.Add(new ToastMessage(ToastType.Danger, "Erreur", "Une erreur est survenue"));
        }
        finally
        {
            await modal.HideAsync();
        }
    }

    internal void SetBetIdToComplete(string betId)
    {
        this.betId = betId;
    }

    internal async Task LoadAsync()
    {
        var bets = await mediator.Send(new RetrieveBetsQuery());
        Bets = new(bets.Select(x =>
        {
            var answer = x.Gamblers.FirstOrDefault(y => y.Id == userContext.UserId)?.HasAccepted;
            return new BetDto(x.BetId,
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
                            answer.HasValue ? answer.Value ? AcceptedText : RejectText : string.Empty,
                            x.IsSuccess,
                            x.IsSuccess == null ? null : GetResult(x.IsSuccess.Value, x.BookieId));
        }));
    }

    private static bool? GetAnswer(string answer)
    {
        if (string.IsNullOrEmpty(answer))
            return null!;
        return answer == AcceptedText;
    }

    private bool CanAnswer(RetrieveBetsItemResponse bet)
        => bet.Gamblers.Any(x => x.Id == userContext.UserId) &&
            bet.MaxAnswerDate > dateTimeProvider.GetCurrentDate();

    private string GetResult(bool isSuccess, string bookieId)
    {
        if (bookieId == userContext.UserId)
            return isSuccess ? WinText : LoseText;
        return isSuccess ? LoseText : WinText;
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
                bool canClose,
                string bookieId,
                string bookieName,
                int invitedCount,
                int acceptedCount,
                string answer,
                bool? isSuccess,
                string? result) : this(betId,
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
        this.isSuccess = isSuccess;
        this.result = result;
        this.canClose = canClose;
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
    private bool canClose;
    [ObservableProperty]
    private string? result;
    [ObservableProperty]
    private bool? isSuccess;
    [ObservableProperty]
    private int acceptedCount;
    [ObservableProperty]
    private string answer;
}