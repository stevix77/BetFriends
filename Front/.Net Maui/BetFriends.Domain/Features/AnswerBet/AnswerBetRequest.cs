using MediatR;

namespace BetFriends.Domain.Features.AnswerBet;

public record AnswerBetRequest(bool Answer,
                               string BetId,
                               string BookieId,
                               DateTime EndDate, 
                               bool? OldAnswer = null) : IRequest;
