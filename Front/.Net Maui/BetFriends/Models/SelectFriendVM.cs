using CommunityToolkit.Mvvm.ComponentModel;

namespace BetFriends.Models
{
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
}
