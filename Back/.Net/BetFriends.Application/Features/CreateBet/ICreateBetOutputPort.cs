
namespace BetFriends.Application.Features.CreateBet;

public interface ICreateBetOutputPort
{
    void ChipsMissing();
    void EndDateIsTooOld();
    void FriendsMissing();
    void MemberDoesNotExist(Guid userId);
    void Present(CreateBetResponse createBetResponse);
}
