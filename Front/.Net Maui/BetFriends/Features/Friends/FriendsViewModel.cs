using BetFriends.Models;
using CommunityToolkit.Mvvm.ComponentModel;
using MediatR;
using System.Collections.ObjectModel;

namespace BetFriends.Features.Friends;

public partial class FriendsViewModel : ObservableObject
{
    private readonly IMediator mediator;

    [ObservableProperty]
    private string search;
    [ObservableProperty]
    private ObservableCollection<MemberVM> members;

    public FriendsViewModel(IMediator mediator)
    {
        this.mediator = mediator;
    }


}
