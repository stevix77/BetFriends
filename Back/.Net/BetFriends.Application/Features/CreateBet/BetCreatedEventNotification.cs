using BetFriends.Domain.Bets;
using BetFriends.Domain.Members;
using MediatR;

namespace BetFriends.Application.Features.CreateBet;

public record BetCreatedEventNotification(BetId BetId, MemberId OwnerId, int Chips) : INotification;
