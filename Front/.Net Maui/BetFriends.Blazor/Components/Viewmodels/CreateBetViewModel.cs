using BetFriends.Blazor.Exceptions;
using BetFriends.Blazor.Services.Abstractions;
using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveFriends;
using BlazorBootstrap;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Blazor.Components.Viewmodels;

public partial class CreateBetViewModel : ObservableObject
{
    private readonly IMediator mediator;
    private readonly IDateTimeProvider dateTimeProvider;
    private readonly Services.Abstractions.INavigation navigation;

    public CreateBetViewModel(IMediator mediator, IDateTimeProvider dateTimeProvider, Services.Abstractions.INavigation navigation)
    {
        this.mediator = mediator;
        this.dateTimeProvider = dateTimeProvider;
        this.navigation = navigation;
        MaxCoins = 1000;
        EndDate = dateTimeProvider.GetCurrentDate();
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, CreateBetException>((o, e) =>
        {
            Errors.Add(new ToastMessage(ToastType.Danger, "Erreur", e.Message));
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, CreateBetResponse>((o, e) =>
        {
            Reset();
            this.navigation.Navigate("/");
        }));
    }

    [ObservableProperty]
    private string description;

    [ObservableProperty]
    private int coins;

    [ObservableProperty]
    private int maxCoins;

    [ObservableProperty]
    private DateTime endDate;
    [ObservableProperty]
    private TimeOnly endTime;

    [ObservableProperty]
    private DateTime minDate;
    [ObservableProperty]
    private bool isLoading;
    [ObservableProperty]
    private bool canCreate = true;
    [ObservableProperty]
    private ObservableCollection<SelectFriendVM> friends = new();
    [ObservableProperty]
    private string search;
    [ObservableProperty]
    private string? error;

    public List<ToastMessage> Errors { get; } = new List<ToastMessage>();

    partial void OnSearchChanged(string value)
    {
        //var friendsHidden = Friends.Where(x => !x.Name.Contains(value));
        //var friendsVisible = Friends.Where(x => !friendsHidden.Any(y => y.Id == x.Id));
        //foreach (var item in friendsHidden)
        //    item.IsVisible = false;
        //foreach (var item in friendsVisible)
        //    item.IsVisible = true;
    }

    [RelayCommand]
    private async Task ChooseFriends(Modal modal)
    {
        await modal.ShowAsync();
    }

    [RelayCommand(CanExecute = nameof(CanCreate))]
    private async Task CreateBet()
    {
        try
        {
            IsLoading = true;
            CanCreate = false;
            var command = new CreateBetRequest(Description, EndDate, Coins, new List<string>(Friends.Where(x => x.IsChecked).Select(x => x.Id)));
            await mediator.Send(command, new CancellationToken());
        }
        catch (Exception ex)
        {
            WeakReferenceMessenger.Default.Send(ex);
        }
        finally
        {
            IsLoading = false;
            CanCreate = true;
        }
    }

    internal async Task LoadFriendsAsync()
    {
        try
        {
            var request = new RetrieveFriendsRequest();
            var friends = await mediator.Send(request, new CancellationToken());
            var selectFriendVms = friends.Select(x => new SelectFriendVM() { Id = x.Id, Name = x.Name });
            Friends = new ObservableCollection<SelectFriendVM>(selectFriendVms);
        }
        catch (Exception ex)
        {
            WeakReferenceMessenger.Default.Send(ex);
        }
    }
    private void Reset()
    {
        Description = string.Empty;
        EndDate = MinDate;
        Coins = 0;
        MinDate = dateTimeProvider.GetCurrentDate();
        foreach (var item in Friends)
            item.IsChecked = false;
    }
}

#region classes

public partial class SelectFriendVM : ObservableObject
{
    [ObservableProperty]
    private string id;
    [ObservableProperty]
    private string name;
    [ObservableProperty]
    private bool isChecked;
    [ObservableProperty]
    private bool isVisible = true;
}

#endregion