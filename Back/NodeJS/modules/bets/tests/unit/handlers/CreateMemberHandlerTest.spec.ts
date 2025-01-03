import { describe, test, expect } from 'vitest';
import { UserRegisteredNotification } from "../../../src/application/features/userRegistered/UserRegisteredNotification";
import { CreateMemberHandler } from '../../../src/application/features/userRegistered/CreateMemberHandler';
import { IMemberRepository } from "../../../src/domain/members/IMemberRepository";
import { Member } from '../../../src/domain/members/Member';
import { MemberId } from "../../../src/domain/members/MemberId";
import { MemberSnapshot } from '../../../src/domain/members/MemberSnapshot';

describe('create member', () => {
    test('should create member', async () => {
        const notification = new UserRegisteredNotification('betId', 'username', 'email')
        const repository = new MockMemberRepository()
        const handler = new CreateMemberHandler(repository)
        await handler.Handle(notification);
        expect(repository.Member?.GetSnapshot()).toEqual(new MemberSnapshot('betId', 'username', 2000, 0))
    })
})

class MockMemberRepository implements IMemberRepository {
    Member?: Member;
    Save(member: Member): PromiseLike<void> {
        this.Member = member;
        return Promise.resolve();
    }
    GetByIdAsync(memberId: MemberId): PromiseLike<Member | undefined> {
        throw new Error("Method not implemented.");
    }

}