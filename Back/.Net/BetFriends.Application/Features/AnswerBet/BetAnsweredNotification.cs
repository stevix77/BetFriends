using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using MediatR;

namespace BetFriends.Application.Features.AnswerBet;

public record BetAnsweredNotification(BetId BetId, MemberId MemberId, bool Answer) : INotification;
