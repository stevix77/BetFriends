using BetFriends.Api.Features.Bets;
using BetFriends.Api.Features.Friendship;
using BetFriends.Api.Features.Users;
using BetFriends.Api.HostedServices;
using BetFriends.Api.UserContexts;
using BetFriends.Bets.Application.Abstractions;
using BetFriends.Bets.Application.Features.AddFriend;
using BetFriends.Bets.Application.Features.AnswerBet;
using BetFriends.Bets.Application.Features.CompleteBet;
using BetFriends.Bets.Application.Features.CreateBet;
using BetFriends.Bets.Infrastructure;
using BetFriends.Users.Application.Abstractions;
using BetFriends.Users.Application.Features.Register;
using BetFriends.Users.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddLogging();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<AddFriendshipPresenter>();
builder.Services.AddScoped<IAddFriendOutputPort>(x => x.GetRequiredService<AddFriendshipPresenter>());
builder.Services.AddScoped<CreateBetPresenter>();
builder.Services.AddScoped<ICreateBetOutputPort>(x => x.GetRequiredService<CreateBetPresenter>());
builder.Services.AddScoped<AnswerBetPresenter>();
builder.Services.AddScoped<IAnswerBetOutputPort>(x => x.GetRequiredService<AnswerBetPresenter>());
builder.Services.AddScoped<CompleteBetPresenter>();
builder.Services.AddScoped<ICompleteBetOutputPort>(x => x.GetRequiredService<CompleteBetPresenter>());
builder.Services.AddSingleton<RegisterPresenter>();
builder.Services.AddSingleton<IRegisterOutputPort>(x => x.GetRequiredService<RegisterPresenter>());
builder.Services.AddScoped<IUserContext, HttpUserContext>();
builder.Services.AddHostedService<ProcessOutboxHostedService>();
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserModule, UserModule>();
builder.Services.AddScoped<IBetModule, BetModule>();
builder.Services.AddBetInfrastructure();
var app = builder.Build();


UserStartup.Init(app.Logger, app.Services);
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
