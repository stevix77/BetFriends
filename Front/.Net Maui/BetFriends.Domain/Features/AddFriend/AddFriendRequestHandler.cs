using BetFriend.Domain.Friends;
using MediatR;

namespace BetFriend.Domain.Features.AddFriend;

public sealed class AddFriendRequestHandler : IRequestHandler<AddFriendRequest>
{
    private readonly IFriendRepository repository;
    private readonly IAddFriendOutputPort presenter;

    public AddFriendRequestHandler(IFriendRepository repository, IAddFriendOutputPort presenter)
    {
        this.repository = repository;
        this.presenter = presenter;
    }

    public async Task Handle(AddFriendRequest request, CancellationToken cancellationToken)
    {
        await repository.AddAsync(request.Id, cancellationToken);
        presenter.Present(request.Id);
    }
}

public record AddFriendRequest(string Id) : IRequest;