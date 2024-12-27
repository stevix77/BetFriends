using BetFriends.Shared.Infrastructure.IntegrationsEvents.Abstractions;

namespace BetFriends.Users.Infrastructure.IntegrationEvents;

public record UserRegisteredIntegrationEvent(Guid UserId, string Username, string Email) : IIntegrationEvent;
