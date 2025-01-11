using BetFriends.Bets.Application.Features.MemberInfo;
using Dapper;
using Microsoft.Data.SqlClient;

namespace BetFriends.Bets.Infrastructure.DataAccess.Sql;

internal class GetMemberInfoDataAccess(SqlConnection sqlConnection) : IGetMemberInfoDataAccess
{
    private readonly SqlConnection sqlConnection = sqlConnection;

    public async Task<GetMemberInfoResponse> GetAsync(Guid userId)
    {
        var query = await sqlConnection.QueryFirstOrDefaultAsync<GetMemberInfoQuery>($"SELECT username Username, wallet Wallet FROM bet.members WHERE member_id = @memberId", new
        {
            memberId = userId
        });
        if (query == null)
            return null!;
        return new GetMemberInfoResponse(query.Username, query.Wallet);
    }
}

public class GetMemberInfoQuery
{
    public string Username { get; init; }
    public int Wallet { get; init; }
}