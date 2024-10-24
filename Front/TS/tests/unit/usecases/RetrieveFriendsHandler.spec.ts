import { FriendDto, RetrieveFriendsHandler } from "../../../src/domain/features/RetrieveFriendsHandler";
import { StubFriendRepository } from "../implems/StubFriendRepository";
import { expect, test, describe } from 'vitest'
import { FakeRetrieveFriendsPresenter } from '../implems/FakeRetrieveFriendsPresenter';

describe('retrieve friends handler test', () => {

   test('should retrieve friends', async () => {
        const expectedFriends: FriendDto[] = [{
            Id: "1",
            Name: "toto"
        },
        {
            Id: "2",
            Name: "tata"
        }]
        const repository = new StubFriendRepository(expectedFriends);
        const presenter = new FakeRetrieveFriendsPresenter();
        const handler = new RetrieveFriendsHandler(repository, presenter);
        await handler.Handle();
        expect(presenter.Friends).toBe(expectedFriends)
   })
    
});