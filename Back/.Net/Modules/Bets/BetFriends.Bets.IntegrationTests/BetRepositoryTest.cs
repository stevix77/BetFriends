using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Infrastructure.Repositories.Sql;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using DotNet.Testcontainers.Builders;
using Microsoft.EntityFrameworkCore;

namespace BetFriends.Bets.IntegrationTests;

public class BetRepositoryTest : RepositoryTest, IDisposable
{
    //public async Task InitializeAsync()
    //{
    //    var msSqlContainer = new ContainerBuilder()
    //                              .WithImage("mcr.microsoft.com/mssql/server:2022-latest")
    //                              .WithPortBinding(port)
    //                                .WithEnvironment("ACCEPT_EULA", "Y")
    //                                .WithEnvironment("SQLCMDUSER", "sa")
    //                                .WithEnvironment("MSSQL_SA_PASSWORD", "Password!")
    //                                .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(port))
    //                              .Build();
    //    await msSqlContainer.StartAsync();
    //    var connectionString = $"Server=localhost,{port};User Id=sa;Password=Password!;Connection Timeout=30;TrustServerCertificate=True";
    //    var optionsBuilder = new DbContextOptionsBuilder<BetContext>();
    //    var dbContextOptions = optionsBuilder.UseSqlServer(connectionString).Options;
    //    dbContext = new BetContext(dbContextOptions);
    //    await dbContext.Database.EnsureCreatedAsync();
    //}

    [Fact]
    public async Task ShouldSaveNewBet()
    {
        var repository = new SqlBetRepository(dbContext, new());
        var bet = Bet.CreateFromEntity(Guid.NewGuid(),
                                       Guid.NewGuid(),
                                       "description",
                                       300,
                                       new DateTime(2025, 1, 20),
                                       Guid.NewGuid().ToString(),
                                       new DateTime(2025, 2, 20),
                                       null);
        await repository.SaveAsync(bet);
        var entity = repository.GetEntity(bet.BetId.Value);
        Assert.NotNull(entity);
    }

    [Fact]
    public async Task ShouldNotReturnBetWhenIdUnknown()
    {
        var repository = new SqlBetRepository(dbContext, new());
        var bet = await repository.GetByIdAsync(new BetId(Guid.NewGuid()));
        Assert.Null(bet);
    }

    [Fact]
    public async Task ShouldReturnBetWhenIdExist()
    {
        var betId = Guid.NewGuid();
        var repository = new SqlBetRepository(dbContext, new());
        repository.SaveEntity(new BetEntity(Bet.CreateFromEntity(betId,
                                       Guid.NewGuid(),
                                       "description",
                                       300,
                                       new DateTime(2025, 1, 20),
                                       Guid.NewGuid().ToString(),
                                       new DateTime(2025, 2, 20),
                                       null)));
        var bet = await repository.GetByIdAsync(new(betId));
        Assert.NotNull(bet);
    }

    public void Dispose()
    {
        dbContext.Database.RollbackTransaction();
        dbContext.Dispose();
    }
}
