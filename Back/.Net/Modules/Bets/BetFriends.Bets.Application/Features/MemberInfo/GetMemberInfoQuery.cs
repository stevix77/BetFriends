using BetFriends.Bets.Application.Abstractions;
using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Bets.Application.Features.MemberInfo;

public sealed class GetMemberInfoQueryHandler(IUserContext userContext, IGetMemberInfoDataAccess getMemberInfoDataAccess) : IQueryHandler<GetMemberInfoQuery, GetMemberInfoResponse>
{
    private readonly IUserContext userContext = userContext;
    private readonly IGetMemberInfoDataAccess getMemberInfoDataAccess = getMemberInfoDataAccess;

    public Task<GetMemberInfoResponse> Handle(GetMemberInfoQuery request, CancellationToken cancellationToken)
        => getMemberInfoDataAccess.GetAsync(userContext.UserId);
}

public interface IGetMemberInfoDataAccess
{
    Task<GetMemberInfoResponse> GetAsync(Guid userId);
}

public record GetMemberInfoQuery() : IQuery<GetMemberInfoResponse>;

public record GetMemberInfoResponse(string Username, int Coins);
