using BetFriends.Bets.Infrastructure.Outboxes;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using BetFriends.Shared.Infrastructure.Outboxes;

namespace BetFriends.Bets.IntegrationTests;

public class OutboxAccessorTest : RepositoryTest, IDisposable
{
    [Fact]
    public async Task ShouldSaveOutbox()
    {
        var outboxAccessor = new SqlOutboxAccessor(dbContext);
        var outbox = new Outbox(Guid.NewGuid(), "type", "data", new DateTime(2025, 1, 25));
        await outboxAccessor.AddAsync(outbox);
        var entity = outboxAccessor.GetEntity(outbox.Id);
        Assert.NotNull(entity);
    }

    [Fact]
    public async Task ShouldUpdateOutbox()
    {
        var id = Guid.NewGuid();
        var outbox = new Outbox(id, "type", "data", new DateTime(2025, 1, 25));
        dbContext.Outboxes.Add(new OutboxEntity { Id = id });
        outbox.Handled(new StubDateProvider(new DateTime(2025, 1, 21)));
        var outboxAccessor = new SqlOutboxAccessor(dbContext);
        await outboxAccessor.SaveAsync(outbox);
        var entity = outboxAccessor.GetEntity(outbox.Id);
        Assert.NotNull(entity);
        Assert.Equal(outbox.ProcessedOn, entity.ProcessedOn);
    }

    [Fact]
    public async Task ShouldReturnOutboxes()
    {
        await dbContext.Outboxes.AddRangeAsync(new OutboxEntity { Id = Guid.NewGuid(), Type = "type", Data = "data", OccurredOn = new DateTime(2025, 1, 25) },
                                            new OutboxEntity { Id = Guid.NewGuid(), Type = "type", Data = "data", OccurredOn = new DateTime(2025, 1, 25), ProcessedOn = new DateTime(2025, 1, 25) });
        await dbContext.SaveChangesAsync();
        var outboxAccessor = new SqlOutboxAccessor(dbContext);
        var outboxes = await outboxAccessor.GetAllAsync();
        Assert.Single(outboxes);
    }


    public void Dispose()
    {
        dbContext.Database.RollbackTransaction();
        dbContext.Dispose();
    }
}
