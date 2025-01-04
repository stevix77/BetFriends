using BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;

namespace BetFriends.Bets.Infrastructure.IntegrationEvents;

internal record BetCompletedIntegrationEvent(Guid BetId, bool IsSuccessful) : IIntegrationEvent;
