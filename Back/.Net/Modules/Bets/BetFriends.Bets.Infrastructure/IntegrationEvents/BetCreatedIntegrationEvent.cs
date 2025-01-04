using BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;

namespace BetFriends.Bets.Infrastructure.IntegrationEvents;

internal record BetCreatedIntegrationEvent(Guid BetId, Guid BettorId, int Coins) : IIntegrationEvent;
