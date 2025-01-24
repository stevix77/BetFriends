using BetFriends.Api.Features.Bets;
using BetFriends.Api.Features.Friendship;
using BetFriends.Api.Features.Users;
using BetFriends.Api.UserContexts;
using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.AddFriend;
using BetFriends.Bets.Application.Features.AnswerBet;
using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.CreateBet;
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
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.AddLogging();
using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
ILogger logger = factory.CreateLogger<Program>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton(x => logger);
builder.Services.AddScoped<AddFriendshipPresenter>();
builder.Services.AddScoped<IAddFriendOutputPort>(x => x.GetRequiredService<AddFriendshipPresenter>());
builder.Services.AddScoped<CreateBetPresenter>();
builder.Services.AddScoped<ICreateBetOutputPort>(x => x.GetRequiredService<CreateBetPresenter>());
builder.Services.AddScoped<AnswerBetPresenter>();
builder.Services.AddScoped<IAnswerBetOutputPort>(x => x.GetRequiredService<AnswerBetPresenter>());
builder.Services.AddScoped<CompleteBetPresenter>();
builder.Services.AddScoped<ICompleteBetOutputPort>(x => x.GetRequiredService<CompleteBetPresenter>());
builder.Services.AddScoped<RegisterPresenter>();
builder.Services.AddScoped<IUserContext, HttpUserContext>();
builder.Services.AddSingleton<IDateProvider, DateTimeProvider>();
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
builder.Services.AddSingleton<IUserModule, UserModule>();
builder.Services.AddSingleton<IBetModule, BetModule>();
var app = builder.Build();

var eventBus = app.Services.GetRequiredService<IEventBus>();
UserStartup.Init(app.Logger, eventBus, app.Environment.EnvironmentName);
BetStartup.Init(app.Logger, eventBus);
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