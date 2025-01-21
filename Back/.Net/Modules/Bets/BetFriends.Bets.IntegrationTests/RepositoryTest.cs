using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BetFriends.Bets.IntegrationTests;

public abstract class RepositoryTest
{
    protected readonly BetContext dbContext;
    protected readonly string connectionString;
    public RepositoryTest()
    {
        var configuration = new ConfigurationBuilder()
                                .SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile("appsettings.json")
                                .Build();
        connectionString = configuration.GetConnectionString("DbContext")!;
        var optionsBuilder = new DbContextOptionsBuilder<BetContext>();
        var dbContextOptions = optionsBuilder.UseSqlServer(connectionString).Options;
        dbContext = new BetContext(dbContextOptions);
        dbContext.Database.EnsureCreated();
    }
}
