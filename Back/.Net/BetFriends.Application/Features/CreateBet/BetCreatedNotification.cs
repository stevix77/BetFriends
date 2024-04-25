using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using MediatR;

namespace BetFriends.Application.Features.CreateBet;

public record BetCreatedNotification(BetId betId, MemberId ownerId) : INotification;