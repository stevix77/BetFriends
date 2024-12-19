using BetFriend;
using BetFriends.Features.Bets.CreateBet;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriends.Features.Auth.Signin;

public partial class SigninPage : ContentPage
{
	public SigninPage(SigninViewModel signinViewModel)
	{
		InitializeComponent();
		BindingContext = signinViewModel;
		signinViewModel.SetNavigation(Navigation);
        
    }
}