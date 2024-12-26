using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Users.Infrastructure.Outboxes;

public record ProcessOutboxCommand() : ICommand;
