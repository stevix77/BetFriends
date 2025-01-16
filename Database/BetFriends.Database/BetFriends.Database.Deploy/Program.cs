using Microsoft.Extensions.Configuration;
using Microsoft.SqlServer.Dac;

//var path = args[0];
var path = "D:\\Workspaces\\OSS\\BetFriends\\Database\\BetFriends.Database\\BetFriends.Database.Build\\bin\\Debug\\netstandard2.0\\BetFriends.Database.Build.dacpac";
Console.WriteLine($"DacPackage filename :{path}");
if (!string.IsNullOrEmpty(path))
{
    var configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();
    var connectionString = configuration.GetConnectionString("betfriends");
    Console.WriteLine($"ConnectionString: {connectionString}");
    using var dacPackage = DacPackage.Load(path);
    Console.WriteLine("DacPackage loaded");
    var service = new DacServices(connectionString);
    Console.WriteLine("Start deploy dacpac");
    service.Deploy(dacPackage, "betfriends", upgradeExisting: true, new DacDeployOptions { BlockOnPossibleDataLoss = false });
    Console.WriteLine("End deploy dacpac");
}
Environment.Exit(0);