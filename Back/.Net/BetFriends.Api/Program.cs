using BetFriends.Api;
using BetFriends.Api.Features.Friendship;
using BetFriends.Application.Abstractions;
using BetFriends.Application.Features.AddFriend;
using BetFriends.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<AddFriendshipPresenter>();
builder.Services.AddScoped<IAddFriendOutputPort>(x => x.GetRequiredService<AddFriendshipPresenter>());
builder.Services.AddScoped<IUserContext, UserContext>();
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructure();

var app = builder.Build();

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
