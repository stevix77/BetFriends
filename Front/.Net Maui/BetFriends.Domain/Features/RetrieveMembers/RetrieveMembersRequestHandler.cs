using BetFriends.Domain.Abstractions;
using MediatR;

namespace BetFriends.Domain.Features.RetrieveMembers;

internal sealed class RetrieveMembersRequestHandler : IRequestHandler<RetrieveMembersRequest, IReadOnlyCollection<MemberDto>>
{
    private readonly IMemberRepository memberRepository;

    public RetrieveMembersRequestHandler(IMemberRepository memberRepository)
    {
        this.memberRepository = memberRepository;
    }

    public Task<IReadOnlyCollection<MemberDto>> Handle(RetrieveMembersRequest request, CancellationToken cancellationToken)
        => memberRepository.RetrieveMembersByKeyword(request.SearchTerm);
}

public record RetrieveMembersRequest(string SearchTerm) : IRequest<IReadOnlyCollection<MemberDto>>;

public record MemberDto()
{
    public MemberDto(string memberId, string name, bool isFriend) : this()
    {
        MemberId = memberId;
        Name = name;
        IsFriend = isFriend;
    }

    public string MemberId { get; }
    public string Name { get; }
    public bool IsFriend { get; set; }
}
