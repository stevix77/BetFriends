using BetFriend.Domain.Features.AddFriend;
using BetFriends.Domain.Features.RetrieveFriends;
using BetFriends.Domain.Features.RetrieveMembers;
using BetFriends.Models;
using BetFriends.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Features.Friends;

public partial class FriendsViewModel : ObservableObject
{
    private readonly IMediator mediator;

    private string search;
    [ObservableProperty]
    private ObservableCollection<MemberVM> members = new();
    [ObservableProperty]
    private ObservableCollection<MemberVM> friends = new();
    [ObservableProperty]
    private bool showFriends = true;

    public FriendsViewModel(IMediator mediator)
    {
        this.mediator = mediator;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, FriendAdded>((o, e) =>
        {
            var member = Members.First(x => x.Id == e.Id);
            member.IsFriend = true;
        }));
    }

    public string Search
    {
        get => search;
        set
        {
            if(SetProperty(ref search, value, nameof(Search)))
            {
                if(value.Length > 2)
                {
                    ShowFriends = false;
                    SearchMembersAsync();
                    return;
                }
                ShowFriends = true;
            }
        }
    }

    internal async Task LoadAsync()
    {
        var request = new RetrieveFriendsRequest();
        var friends = await mediator.Send(request);
        Friends = new ObservableCollection<MemberVM>(friends.Select(x => new MemberVM
        {
            Id = x.Id,
            Name = x.Name
        }));
    }

    private async void SearchMembersAsync()
    {
        var request = new RetrieveMembersRequest(search);
        var members = await mediator.Send(request);
        Members = new ObservableCollection<MemberVM>(members.Select(x => new MemberVM
        {
            Id = x.MemberId,
            IsFriend = x.IsFriend,
            Name = x.Name
        }));
    }

    [RelayCommand]
    async Task Add(object obj)
    {
        try
        {
            var member = (MemberVM)obj;
            var request = new AddFriendRequest(member.Id);
            await mediator.Send(request);
        }
        catch (Exception ex)
        {
            WeakReferenceMessenger.Default.Send(ex);
        }
    }
}
