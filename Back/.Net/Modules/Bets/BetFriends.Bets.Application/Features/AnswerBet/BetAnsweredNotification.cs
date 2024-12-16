using BetFriends.Bets.Domain.Bets;
using BetFriends.Bets.Domain.Members;
using MediatR;

namespace BetFriends.Bets.Application.Features.AnswerBet;

public record BetAnsweredNotification(BetId BetId, MemberId MemberId, bool Answer) : INotification;
