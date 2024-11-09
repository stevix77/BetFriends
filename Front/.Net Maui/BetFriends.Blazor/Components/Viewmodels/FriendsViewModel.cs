using BetFriend.Domain.Features.AddFriend;
using BetFriends.Blazor.Presenters;
using BetFriends.Domain.Features.RetrieveFriends;
using BetFriends.Domain.Features.RetrieveMembers;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Blazor.Components.Viewmodels;

public partial class FriendsViewModel : ObservableObject
{
    private readonly IMediator mediator;

    [ObservableProperty]
    private string search = string.Empty;
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
            Friends.Add(new MemberVM
            {
                Id = member.Id,
                Name = member.Name,
                IsFriend = member.IsFriend
            });
        }));
    }

    async partial void OnSearchChanged(string value)
    {
        if (value?.Length > 2)
        {
            ShowFriends = false;
            await SearchMembersAsync();
            return;
        }
        ShowFriends = true;
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

    internal async Task SearchMembersAsync()
    {
        var request = new RetrieveMembersRequest(Search!);
        var members = await mediator.Send(request);
        Members = new ObservableCollection<MemberVM>(members.Select(x => new MemberVM
        {
            Id = x.MemberId,
            IsFriend = x.IsFriend,
            Name = x.Name
        }));
    }

    [RelayCommand]
    async Task Add(string memberId)
    {
        try
        {
            var request = new AddFriendRequest(memberId);
            await mediator.Send(request);
        }
        catch (Exception ex)
        {
            WeakReferenceMessenger.Default.Send(ex);
        }
    }
}

#region classes

public partial class MemberVM : ObservableObject
{
    [ObservableProperty]
    private string id;
    [ObservableProperty]
    private string name;
    [ObservableProperty]
    private bool isFriend;
}

#endregion