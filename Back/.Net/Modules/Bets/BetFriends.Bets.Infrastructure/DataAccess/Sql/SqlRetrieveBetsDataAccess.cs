using BetFriends.Bets.Application.Features.RetrieveBets;
using Dapper;
using Microsoft.Data.SqlClient;

namespace BetFriends.Bets.Infrastructure.DataAccess.Sql;

internal class SqlRetrieveBetsDataAccess(SqlConnection sqlConnection) : IRetrieveBetsDataAccess
{
    private readonly SqlConnection sqlConnection = sqlConnection;
    private const string sql = @"SELECT b.bet_id Id, 
                                        b.description Description, 
                                        b.coins Coins, 
                                        b.end_date EndDate, 
                                        b.max_answer_date MaxAnswerDate,
                                        b.bettor_id BettorId,
                                        m.username BettorName,
                                        a.gambler_id GamblerId,
                                        mm.username GamblerName,
                                        a.answer Answer                                        
                            FROM bet.bets b 
                            INNER JOIN bet.members m ON b.bettor_id = m.member_id 
                            LEFT JOIN bet.answers a ON a.bet_id = b.bet_id
                            INNER JOIN bet.members mm ON mm.member_id = a.gambler_id
                            WHERE b.bettor_id = '@Id'
                            OR a.gambler_id = '@Id'
                            ORDER BY b.max_answer_date";
    public async Task<IEnumerable<RetrieveBetsResponse>> GetAsync(Guid memberId)
    {
        var query = await sqlConnection.QueryAsync<RetrieveBetsQuery>(sql, new
        {
            Id = memberId
        });
        var bets = new List<RetrieveBetsResponse>();
        Guid betId = Guid.Empty;
        Guid bettorId = default!;
        string description = default!;
        string bettorName = default!;
        int coins = default!;
        DateTime endDate = default!;
        DateTime maxAnswerDate = default!;
        var gamblers = new List<GamblerDto>();
        foreach (var response in query.OrderBy(x => x.Id))
        {
            if (betId != Guid.Empty && response.Id != betId)
            {
                bets.Add(new RetrieveBetsResponse(betId,
                                                description,
                                                endDate,
                                                coins,
                                                bettorId,
                                                bettorName,
                                                maxAnswerDate,
                                                gamblers));
                gamblers = [];
            }
            gamblers.Add(new GamblerDto(response.GamblerId,
                                        response.GamblerName,
                                        response.Answer));

            betId = response.Id;
            bettorId = response.BettorId;
            description = response.Description;
            bettorName = response.BettorName;
            coins = response.Coins;
            endDate = response.EndDate;
            maxAnswerDate = response.MaxAnswerDate;
        }
        return bets;
    }
}

public class RetrieveBetsQuery
{
    public Guid Id { get; init; }
    public string Description { get; init; }
    public int Coins { get; init; }
    public DateTime EndDate { get; init; }
    public DateTime MaxAnswerDate { get; init; }
    public Guid BettorId { get; init; }
    public string BettorName { get; init; }

    public Guid GamblerId { get; init; }
    public string GamblerName { get; init; }
    public bool? Answer {  get; init; }
}