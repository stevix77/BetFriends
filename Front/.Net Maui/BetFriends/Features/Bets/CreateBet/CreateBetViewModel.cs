using BetFriends.Domain.Abstractions;
using BetFriends.Domain.Features.CreateBet;
using BetFriends.Domain.Features.RetrieveFriends;
using BetFriends.Features.Bets.RetrieveBets;
using BetFriends.Features.Friends;
using BetFriends.Models;
using BetFriends.Services;
using CommunityToolkit.Maui.Alerts;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Features.Bets.CreateBet;

public partial class CreateBetViewModel : ObservableObject
{
    private readonly IMediator mediator;
    private readonly IDateTimeProvider dateTimeProvider;

    public CreateBetViewModel(IMediator mediator, IDateTimeProvider dateTimeProvider)
    {
        this.mediator = mediator;
        this.dateTimeProvider = dateTimeProvider;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, CreateBetException>(async (o, e) =>
        {
            await Toast.Make(e.Message).Show();
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, CreateBetResponse>(async (o, e) =>
        {
            Reset();
            await Shell.Current.GoToAsync("..");
            await Shell.Current.GoToAsync($"//{nameof(RetrieveBetsPage)}");
        }));
    }

    [ObservableProperty]
    private string description;

    [ObservableProperty]
    private int chips;

    [ObservableProperty]
    private int maxChips;

    [ObservableProperty]
    private DateTime endDate;

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

    partial void OnSearchChanged(string value)
    {
        var friendsHidden = Friends.Where(x => !x.Name.Contains(value));
        var friendsVisible = Friends.Where(x => !friendsHidden.Any(y => y.Id == x.Id));
        foreach(var item in friendsHidden)
            item.IsVisible = false;
        foreach(var item in friendsVisible) 
            item.IsVisible = true;
    }

    [RelayCommand]
    private async Task ChooseFriends()
    {
        await Shell.Current.GoToAsync($"{nameof(SelectFriendsPage)}");
    }

    [RelayCommand(CanExecute = nameof(CanCreate))]
    private async Task CreateBet()
    {
        try
        {
            IsLoading = true;
            CanCreate = false;
            var command = new CreateBetRequest(Description, EndDate, Chips, Friends.Where(x => x.IsChecked)
                                                                                    .Select(x => x.Id)
                                                                                    .ToList());
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

    internal async void LoadFriendsAsync()
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

    internal void Init()
    {
        MaxChips = Data.Chips;
        MinDate = dateTimeProvider.GetCurrentDate();
    }
    private void Reset()
    {
        Description = string.Empty;
        EndDate = MinDate;
        Chips = 0;
        Search = string.Empty;
        foreach (var item in Friends)
            item.IsChecked = false;
    }
}
