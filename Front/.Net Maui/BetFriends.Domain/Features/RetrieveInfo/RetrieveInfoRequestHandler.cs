using BetFriends.Domain.Abstractions;
using MediatR;

namespace BetFriends.Domain.Features.RetrieveInfo;

public sealed class RetrieveInfoRequestHandler(IMemberRepository memberRepository) : IRequestHandler<RetrieveInfoQuery, RetrieveInfoResponse>
{
    private readonly IMemberRepository memberRepository = memberRepository;

    public Task<RetrieveInfoResponse> Handle(RetrieveInfoQuery request, CancellationToken cancellationToken)
        => memberRepository.RetrieveInfoAsync();
}


public record RetrieveInfoResponse(string Username, int Coins);