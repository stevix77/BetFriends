using BetFriends.Bets.Infrastructure.Outboxes;
using BetFriends.Shared.Infrastructure.Outboxes;
using Dapper;
using Microsoft.Data.SqlClient;

namespace BetFriends.Bets.IntegrationTests;

public class OutboxAccessorTest : RepositoryTest, IDisposable
{
    [Fact]
    public async Task ShouldSaveOutbox()
    {
        var dbConnection = new SqlConnection(connectionString);
        dbConnection.Open();
        var transaction = dbConnection.BeginTransaction();
        var outboxAccessor = new SqlOutboxAccessor(dbConnection, transaction);
        var outbox = new Outbox(Guid.NewGuid(), "type", "data", new DateTime(2025, 1, 25));
        await outboxAccessor.AddAsync(outbox);
        var entity = outboxAccessor.GetEntity(outbox.Id);
        Assert.NotNull(entity);
        transaction.Rollback();
        dbConnection.Close();
    }

    [Fact]
    public async Task ShouldUpdateOutbox()
    {
        var dbConnection = new SqlConnection(connectionString);
        dbConnection.Open();
        var transaction = dbConnection.BeginTransaction();
        var outbox = new Outbox(Guid.NewGuid(), "type", "data", new DateTime(2025, 1, 25));
        dbConnection.Execute("INSERT INTO bet.outbox (id, type, data, occured_on) VALUES (@id, 'type', 'data', @occuredOn)", new
        {
            id = outbox.Id,
            occuredOn = outbox.OccurredOn
        }, transaction);
        outbox.Handled(new StubDateProvider(new DateTime(2025, 1, 21)));
        var outboxAccessor = new SqlOutboxAccessor(dbConnection, transaction);
        await outboxAccessor.SaveAsync(outbox);
        var entity = outboxAccessor.GetEntity(outbox.Id);
        Assert.NotNull(entity);
        Assert.Equal(outbox.ProcessedOn, entity.ProcessedOn);
        transaction.Rollback();
        dbConnection.Close();
    }

    [Fact]
    public async Task ShouldReturnOutboxes()
    {
        var id1 = Guid.NewGuid();
        var id2 = Guid.NewGuid();
        var dbConnection = new SqlConnection(connectionString);
        dbConnection.Open();
        dbConnection.Execute("INSERT INTO bet.outbox (id, type, data, occured_on, processed_on) VALUES (@id1, 'type', 'data', @occuredOn, null), (@id2, 'type', 'data', @occuredOn, @processedOn)", new
        {
            id1,
            id2,
            occuredOn = new DateTime(2025, 1, 21),
            processedOn = new DateTime(2025, 1, 21)
        });
        var outboxAccessor = new SqlOutboxAccessor(dbConnection, null);
        var outboxes = await outboxAccessor.GetAllAsync();
        Assert.Single(outboxes);
        Assert.Equal(id1, outboxes.First().Id);
        dbConnection.Execute("DELETE FROM bet.outbox");
        dbConnection.Close();
    }


    public void Dispose()
    {
        dbContext.Dispose();
    }
}
