namespace BetFriends.Bets.Application.Features.CreateBet;

public interface ICreateBetOutputPort
{
    void CoinsMissing();
    void EndDateIsTooOld();
    void FriendsMissing();
    void MemberDoesNotExist(Guid userId);
    void Present(CreateBetResponse createBetResponse);
}
