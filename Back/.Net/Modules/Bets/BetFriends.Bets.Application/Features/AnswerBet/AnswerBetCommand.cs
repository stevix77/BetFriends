using BetFriends.Shared.Application.Abstractions.Messaging;

namespace BetFriends.Bets.Application.Features.AnswerBet;

public record AnswerBetCommand(Guid BetId, bool Answer) : ICommand;
