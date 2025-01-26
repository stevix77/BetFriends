using BetFriends.Shared.Infrastructure.Outboxes;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.Data.SqlClient;
//using Dapper;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Users.Infrastructure.Outboxes;

internal class SqlOutboxAccessor(UserContext dbContext) : IOutbox
{
    //private readonly SqlConnection sqlConnection = sqlConnection;
    //private readonly SqlTransaction sqlTransaction = sqlTransaction;
    private readonly DbContext dbContext = dbContext;

    public Task AddAsync(Outbox outbox)
    {
        return Task.CompletedTask;
        //return sqlConnection.ExecuteAsync($"INSERT INTO usr.outbox (id, type, data, occured_on) VALUES (@id, @type, @data, @occuredOn)", new
        //{
        //    id = outbox.Id,
        //    type = outbox.Type,
        //    data = outbox.Data,
        //    occuredOn = outbox.OccurredOn
        //}, sqlTransaction);
    }

    public Task<IEnumerable<Outbox>> GetAllAsync()
    {
        return Task.FromResult<IEnumerable<Outbox>>([]);
        //var query = await sqlConnection.QueryAsync<OutboxQuery>($"SELECT Id, Type, Data, occured_on OccuredOn FROM usr.outbox WHERE processed_on is null", transaction: sqlTransaction);
        //return query.Select(outbox => new Outbox(outbox.Id, outbox.Type, outbox.Data, outbox.OccuredOn));
    }

    public Task SaveAsync(Outbox item)
    {
        return Task.CompletedTask;
        //return sqlConnection.ExecuteAsync($"UPDATE usr.outbox SET processed_on = @processedOn", new
        //{
        //    processedOn = item.ProcessedOn,
        //}, sqlTransaction);
    }
}

public class OutboxQuery
{
    public Guid Id { get; init; }
    public string Type { get; init; }
    public string Data { get; init; }
    public DateTime OccuredOn { get; init; }
}
