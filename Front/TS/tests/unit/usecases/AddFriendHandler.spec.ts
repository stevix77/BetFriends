import { describe, test, expect } from 'vitest';
import { AddFriendHandler } from '../../../src/domain/features/AddFriendHandler';
import { FakeAddFriendPresenter } from '../implems/FakeAddFriendPresenter';
import { StubFriendRepository } from '../implems/StubFriendRepository';
describe('add friend handler', () => {

    test('should add friend', async () => {
        const presenter = new FakeAddFriendPresenter();
        const repository = new StubFriendRepository();
        const handler = new AddFriendHandler(repository, presenter)
        await handler.Handle({
            MemberId: "memberId"
        })
        expect(presenter.MemberId).toBe("memberId")
        expect(repository.Members).toEqual(["memberId"])
    })

})