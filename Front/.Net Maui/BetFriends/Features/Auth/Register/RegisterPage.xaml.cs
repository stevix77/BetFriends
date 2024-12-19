namespace BetFriends.Features.Auth.Register;

public partial class RegisterPage : ContentPage
{
	public RegisterPage(RegisterViewModel registerViewModel)
	{
		InitializeComponent();
		BindingContext = registerViewModel;
		registerViewModel.SetNavigation(Navigation);

    }
}