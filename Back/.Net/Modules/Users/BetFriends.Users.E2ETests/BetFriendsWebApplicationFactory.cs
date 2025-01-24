using BetFriends.Shared.Application.Abstractions;
using BetFriends.Users.E2ETests.Implems;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace BetFriends.Users.E2ETests;

public class BetFriendsWebApplicationFactory<T> : WebApplicationFactory<T> where T : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        //builder.ConfigureServices(services =>
        //{
        //    services.AddScoped<IDateProvider>(x => new FakeDateProvider(new DateTime())
        //});
        base.ConfigureWebHost(builder);
    }
}
