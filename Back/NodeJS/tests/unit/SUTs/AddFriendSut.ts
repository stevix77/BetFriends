import { Member } from '../../../src/domain/members/Member';
import { MemberId } from '../../../src/domain/members/MemberId';
import { StubMemberRepository } from '../implems/StubMemberRepository';
import { AddFriendCommand, AddFriendCommandHandler } from '../../../src/application/features/add-friend/AddFriendHandler';
import { StubFriendshipRepository } from '../implems/StubFriendshipRepository';
import { StubUserContext } from '../implems/StubUserContext';
import { StubAddFriendPresenter } from '../implems/StubAddFriendPresenter';
import { expect } from 'vitest';
import { FriendshipsRequested } from '../../../src/domain/friendships/events/FriendshipsRequested';
export class AddFriendSut {
    
    private memberId: string;
    private memberRepository: StubMemberRepository;
    private readonly friendshipRepository: StubFriendshipRepository;
    private readonly presenter: StubAddFriendPresenter;
    constructor(private requesterId: string){
        this.friendshipRepository = new StubFriendshipRepository();
        this.presenter = new StubAddFriendPresenter();
    }

    WithMemberId(memberId: string) : AddFriendSut {
        this.memberId = memberId;
        return this;
    }

    WithMemberRepository() : AddFriendSut {
        this.memberRepository = new StubMemberRepository(new Member(new MemberId(this.memberId)))
        return this;
    }

    WithEmptyMemberRepository() : AddFriendSut {
        this.memberRepository = new StubMemberRepository(undefined)
        return this;
    }
    
    async WhenExecuteHandler() : Promise<AddFriendSut> {
        const handler = new AddFriendCommandHandler(this.friendshipRepository,
                                                    this.memberRepository,
                                                    new StubUserContext(this.requesterId),
                                                    this.presenter)
        await handler.Handle(new AddFriendCommand(this.memberId))
        return this;
    }

    ShouldCreateFriendship() {
        const friendship = this.friendshipRepository.Friendships[0]
        expect(friendship.FriendId).toEqual(new MemberId(this.memberId))
        expect(friendship.RequesterId).toEqual(new MemberId(this.requesterId))
        expect(friendship.DomainEvents).toEqual([new FriendshipsRequested(this.requesterId, this.memberId)])
        expect(this.presenter.FriendAdded).toBeTruthy();
    }

    ShouldNotCreateFriendship() {
        expect(this.friendshipRepository.Friendships).toStrictEqual([])
        expect(this.presenter.FriendAdded).toBeFalsy();
    }
}