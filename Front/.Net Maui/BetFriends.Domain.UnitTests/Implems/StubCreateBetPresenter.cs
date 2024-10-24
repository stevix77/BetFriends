using BetFriends.Domain.Features.CreateBet;

namespace BetFriends.Domain.UnitTests.Implems;

internal class StubCreateBetPresenter : ICreateBetOutputPort
{
    public StubCreateBetPresenter()
    {
    }
    public CreateBetResponse Bet { get; internal set; } = null!;

    public void ChipsAreRequired()
    {
    }

    public void DescriptionIsEmpty()
    {
    }

    public void EndDateIsNotValide(DateTime endDate)
    {
    }

    public void FriendsIsRequired()
    {
    }

    public void Present(CreateBetResponse createBetResponse)
    {
        Bet = createBetResponse;
    }
}