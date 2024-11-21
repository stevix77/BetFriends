using BetFriends.Domain.Features.CompleteBet;
using BetFriends.Features.Bets.RetrieveBets;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using MediatR;

namespace BetFriends.Features.Bets.CompleteBet;

public partial class CompleteBetViewModel : ObservableObject
{
    private readonly IMediator mediator;

    public CompleteBetViewModel(IMediator mediator)
    {
        this.mediator = mediator;
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, ProofMissingError>((o, e) =>
        {
            Error = e.Message;
        }));
        WeakReferenceMessenger.Default.Register(this, new MessageHandler<object, BetCompleted>(async (o, e) =>
        {
            await CloseCommand.ExecuteAsync(null);
        }));
    }

    public string BetId { get; internal set; }

    [ObservableProperty]
    private string error;
    [ObservableProperty]
    private string proof;
    [ObservableProperty]
    private bool? isSuccess;
    [ObservableProperty]
    private bool? win = false;
    [ObservableProperty]
    private bool? lose;
    private FileResult file;

    [RelayCommand]
    private async Task Upload()
    {
        var images = await FilePicker.Default.PickAsync(new PickOptions
        {
            PickerTitle = "Upload proof",
            FileTypes = FilePickerFileType.Images
        });
        Proof = images.FullPath.ToString();
        file = images;
    }

    [RelayCommand]
    private async Task Close()
    {
        await Shell.Current.Navigation.PopModalAsync();

    }

    partial void OnLoseChanged(bool? value)
    {
        ValidateCommand.NotifyCanExecuteChanged();
    }

    partial void OnWinChanged(bool? value)
    {
        ValidateCommand.NotifyCanExecuteChanged();
    }

    public bool CanValidate()
    {
        return Win.HasValue || Lose.HasValue;
    }
    internal void Reset()
    {
        Error = string.Empty;
        Proof = string.Empty;
        file = null;
        IsSuccess = null;
        Win = null;
        Lose = null;
    }

    [RelayCommand(CanExecute = "CanValidate")]
    private async Task Validate()
    {
        try
        {
            string filebs64 = null;
            if (Win.GetValueOrDefault())
            {
                using var stream = await file.OpenReadAsync();
                using var reader = new StreamReader(stream);
                var bytes = System.Text.Encoding.UTF8.GetBytes(await reader.ReadToEndAsync());
                filebs64 = Convert.ToBase64String(bytes);
            }
            await mediator.Send(new CompleteBetRequest(BetId, Win.GetValueOrDefault(false), filebs64));
        }
        catch (Exception)
        {

            throw;
        }
    }
}
