using BetFriends.Application.Abstractions.Messaging;

namespace BetFriends.Application.Features.AnswerBet;

public record AnswerBetCommand(Guid BetId, bool Answer) : ICommand;
