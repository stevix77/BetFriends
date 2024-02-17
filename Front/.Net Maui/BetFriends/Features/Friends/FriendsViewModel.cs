using BetFriend.Domain.Features.AddFriend;
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

    [ObservableProperty]
    private string search;
    [ObservableProperty]
    private ObservableCollection<MemberVM> members = new();

    public FriendsViewModel(IMediator mediator)
    {
        this.mediator = mediator;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, FriendAdded>((o, e) =>
        {
            var member = Members.First(x => x.Id == e.Id);
            member.IsFriend = true;
        }));
    }

    internal async Task LoadAsync()
    {
        Members = new ObservableCollection<MemberVM>(Data.Members);
        await Task.CompletedTask;
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
