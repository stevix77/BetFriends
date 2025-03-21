using BetFriends.Api.Features.Bets;
using BetFriends.Api.Features.Friendship;
using BetFriends.Api.Features.Users;
using BetFriends.Api.UserContexts;
using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Infrastructure;
using BetFriends.Bets.Infrastructure.IntegrationEvents;
using BetFriends.Bets.Infrastructure.Outboxes;
using BetFriends.Shared.Application.Abstractions;
using BetFriends.Shared.Infrastructure;
using BetFriends.Shared.Infrastructure.BackgroundTaskQueue;
using BetFriends.Shared.Infrastructure.EventBus;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Infrastructure;
using BetFriends.Users.Infrastructure.IntegrationEvents;
using BetFriends.Users.Infrastructure.Outboxes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.AddLogging();
using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
ILogger logger = factory.CreateLogger<Program>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton(x => logger);
builder.Services.AddScoped<AddFriendshipPresenter>();
builder.Services.AddScoped<CreateBetPresenter>();
builder.Services.AddScoped<AnswerBetPresenter>();
builder.Services.AddScoped<CompleteBetPresenter>();
builder.Services.AddScoped<RegisterPresenter>();
builder.Services.AddScoped<IUserContext, HttpUserContext>();
builder.Services.AddSingleton<IDateProvider, DateTimeProvider>();
builder.Services.AddSingleton<IUserModule, UserModule>();
builder.Services.AddSingleton<IBetModule, BetModule>();
builder.Services.AddSingleton<BetFriends.Bets.Infrastructure.IntegrationEvents.BackgroundTaskQueue>();
builder.Services.AddSingleton<BetFriends.Users.Infrastructure.IntegrationEvents.BackgroundTaskQueue>();
builder.Services.AddSingleton<IBackgroundTaskQueue>(x => x.GetRequiredService<BetFriends.Bets.Infrastructure.IntegrationEvents.BackgroundTaskQueue>());
builder.Services.AddSingleton<IBackgroundTaskQueue>(x => x.GetRequiredService<BetFriends.Users.Infrastructure.IntegrationEvents.BackgroundTaskQueue>());
builder.Services.AddSingleton<IEventBus, InMemoryEventBus>();
builder.Services.AddHostedService<ProcessUsersOutboxBackgroundService>();
builder.Services.AddHostedService<ProcessBetsOutboxBackgroundService>();
builder.Services.AddHostedService<UserIntegrationEventsBackgroundService>();
builder.Services.AddHostedService<BetIntegrationEventsBackgroundService>();
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
});
var app = builder.Build();

var eventBus = app.Services.GetRequiredService<IEventBus>();
UserStartup.Init(app.Logger, eventBus, new BetFriends.Users.Infrastructure.Configurations.InfrastructureConfiguration
{
    UseFake = app.Configuration.GetValue<bool>("useFake"),
    ConnectionString = app.Configuration.GetConnectionString("betfriendsDbContext")
});
BetStartup.Init(app.Logger, eventBus, new BetFriends.Bets.Infrastructure.Configurations.InfrastructureConfiguration
{
    UseFake = app.Configuration.GetValue<bool>("useFake"),
    ConnectionString = app.Configuration.GetConnectionString("betfriendsDbContext")
});
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
public partial class Program { }