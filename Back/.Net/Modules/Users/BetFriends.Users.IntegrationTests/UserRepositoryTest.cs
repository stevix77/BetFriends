using BetFriends.Users.Domain;
using BetFriends.Users.Domain.Users;
using BetFriends.Users.Infrastructure.Repositories.Sql;
using BetFriends.Users.Infrastructure.Repositories.Sql.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BetFriends.Users.IntegrationTests;

public class UserRepositoryTest : IDisposable
{
    protected readonly string connectionString;
    protected readonly UserContext dbContext;

    public UserRepositoryTest()
    {
        var configuration = new ConfigurationBuilder()
                                    .SetBasePath(Directory.GetCurrentDirectory())
                                    .AddJsonFile("appsettings.json")
                                    .Build();
        connectionString = configuration.GetConnectionString("DbContext")!;
        var optionsBuilder = new DbContextOptionsBuilder<UserContext>();
        var dbContextOptions = optionsBuilder.UseSqlServer(connectionString).Options;
        dbContext = new UserContext(dbContextOptions);
        dbContext.Database.EnsureCreated();
        dbContext.Database.BeginTransaction();
    }

    public void Dispose()
    {
        dbContext.Database.RollbackTransaction();
        dbContext.Dispose();
    }

    [Fact]
    public async Task ShouldSaveNewUser()
    {
        var user = User.Create(Guid.NewGuid(), "username", "email", "password", new FakeTokenGenerator());
        var userRepository = new SqlUserRepository(dbContext, new Shared.Infrastructure.Event.DomainEventsAccessor());
        await userRepository.SaveAsync(user);
        await dbContext.SaveChangesAsync();
        var snapshot = user.Snapshot;
        var entity = (await userRepository.GetEntityById(snapshot.Id))!;
        Assert.Equal(snapshot.Id, entity.Id);
        Assert.Equal(snapshot.Email, entity.Email);
        Assert.Equal(snapshot.Username, entity.Username);
        Assert.Equal(snapshot.RefreshToken, entity.RefreshToken);
        Assert.Equal(snapshot.Password, entity.Password);
    }

    [Fact]
    public async Task ShouldReturnThatUserExistWhenUsernameOrEmailAreKnown()
    {
        var id = Guid.NewGuid();
        var userRepository = new SqlUserRepository(dbContext, default!);
        var entity = new UserEntity(new UserSnapshot(id, "username", "email", "password", "refreshtoken"));
        userRepository.SaveEntity(entity);
        var isExist = await userRepository.IsUserExistAsync("username", "email");
        Assert.True(isExist);
    }

    [Fact]
    public async Task ShouldReturnThatUserDoesNotExistWhenUsernameOrEmailAreUnknown()
    {
        var userRepository = new SqlUserRepository(dbContext, default!);
        var entity = new UserEntity(new UserSnapshot(Guid.NewGuid(), "username", "email", "password", "refreshtoken"));
        userRepository.SaveEntity(entity);
        var isExist = await userRepository.IsUserExistAsync(string.Empty, string.Empty);
        Assert.False(isExist);
    }
}

class FakeTokenGenerator : ITokenGenerator
{
    public string Generate(Guid userId)
    {
        return userId.ToString();
    }
}