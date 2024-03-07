using CommunityToolkit.Mvvm.ComponentModel;

namespace BetFriends.Models;

public partial class MemberVM : ObservableObject
{
    [ObservableProperty]
    private string id;
    [ObservableProperty]
    private string name;
    [ObservableProperty]
    private bool isFriend;
}
