using BetFriends.Shared.Infrastructure.Outboxes;
using Dapper;
using Microsoft.Data.SqlClient;

namespace BetFriends.Bets.Infrastructure.Outboxes;

internal class SqlOutboxAccessor(SqlConnection sqlConnection, SqlTransaction sqlTransaction) : IOutbox
{
    private readonly SqlConnection sqlConnection = sqlConnection;
    private readonly SqlTransaction sqlTransaction = sqlTransaction;

    public Task AddAsync(Outbox outbox)
    {
        return sqlConnection.ExecuteAsync($"INSERT INTO bet.outbox (id, type, data, occured_on) VALUES (@id, @type, @data, @occuredOn)", new
        {
            id = outbox.Id,
            type = outbox.Type,
            data = outbox.Data,
            occuredOn = outbox.OccurredOn
        });
    }

    public async Task<IEnumerable<Outbox>> GetAllAsync()
    {
        var query = await sqlConnection.QueryAsync<OutboxQuery>($"SELECT Id, Type, Data, occured_on OccuredOn FROM bet.outbox WHERE processed_on is null");
        return query.Select(outbox => new Outbox(outbox.Id, outbox.Type, outbox.Data, outbox.OccuredOn));
    }

    public Task SaveAsync(Outbox item)
    {
        return sqlConnection.ExecuteAsync($"UPDATE bet.outbox SET processed_on = @processedOn", new
        {
            processedOn = item.ProcessedOn,
        });
    }
}

public class OutboxQuery
{
    public Guid Id { get; init; }
    public string Type { get; init; }
    public string Data { get; init; }
    public DateTime OccuredOn { get; init; }
}