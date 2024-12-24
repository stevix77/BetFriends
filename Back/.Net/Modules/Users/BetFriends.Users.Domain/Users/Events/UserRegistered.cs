using BetFriends.Shared.Domain;

namespace BetFriends.Users.Domain.Users.Events;

public record UserRegistered(UserId UserId, string Username, string Email) : IDomainEvent;
