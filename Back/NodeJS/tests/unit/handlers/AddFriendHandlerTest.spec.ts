import { describe, test, expect } from 'vitest';
import  {v4 as uuidv4} from 'uuid';
import { AddFriendCommandHandler } from '../../../src/application/features/add-friend/AddFriendHandler';
import { FriendshipsRequested } from '../../../src/domain/friendships/events/FriendshipsRequested';
import { Member } from '../../../src/domain/members/Member';
import { MemberId } from '../../../src/domain/members/MemberId';
import { StubAddFriendPresenter } from '../implems/StubAddFriendPresenter';
import { StubFriendshipRepository } from '../implems/StubFriendshipRepository';
import { StubMemberRepository } from '../implems/StubMemberRepository';
import { StubUserContext } from '../implems/StubUserContext';

describe('add friend handler', () => {
    test('should add friend when member known', async () => {
        const memberId = uuidv4();
        const requesterId = uuidv4();
        const friendshipRepository = new StubFriendshipRepository();
        const memberRepository = new StubMemberRepository(new Member(new MemberId(memberId)));
        const presenter = new StubAddFriendPresenter();
        const handler = new AddFriendCommandHandler(friendshipRepository, memberRepository, new StubUserContext(requesterId), presenter)
        await handler.Handle({MemberId: memberId});
        expect(presenter.FriendAdded).toBeTruthy();
        expect(friendshipRepository.Friendships).toContainEqual([
            {
                FriendId: new MemberId(memberId),
                RequesterId: new MemberId(requesterId),
                //DomainEvents: [new FriendshipsRequested(requesterId, memberId)]
            }
        ]);
    })
})