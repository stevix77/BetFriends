using BetFriends.Blazor.Exceptions;
using BetFriends.Domain.Features.CreateBet;
using CommunityToolkit.Mvvm.Messaging;

namespace BetFriends.Blazor.Presenters;

internal class CreateBetPresenter : ICreateBetOutputPort
{
    public void ChipsAreRequired()
    {
        WeakReferenceMessenger.Default.Send(new CreateBetException("Betting with no chip is forbidden"));
    }

    public void DescriptionIsEmpty()
    {
        WeakReferenceMessenger.Default.Send(new CreateBetException("Description is required"));
    }

    public void EndDateIsNotValide(DateTime endDate)
    {
        WeakReferenceMessenger.Default.Send(new CreateBetException($"{endDate.Date.ToShortDateString()} is not valide"));
    }

    public void FriendsIsRequired()
    {
        WeakReferenceMessenger.Default.Send(new CreateBetException("Need to bet with at least one friend"));
    }

    public void Present(CreateBetResponse createBetResponse)
    {
        WeakReferenceMessenger.Default.Send(createBetResponse);
    }
}
