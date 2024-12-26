using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Bets.Infrastructure.Outboxes;

public record ProcessOutboxCommand : ICommand;
