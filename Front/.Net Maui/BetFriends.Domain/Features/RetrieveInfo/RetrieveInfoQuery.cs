using MediatR;

namespace BetFriends.Domain.Features.RetrieveInfo;

public record RetrieveInfoQuery() : IRequest<RetrieveInfoResponse>;
