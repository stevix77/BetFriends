import { FriendDto, RetrieveFriendsHandler } from "../../../src/domain/features/retrieveFriends/RetrieveFriendsHandler";
import { StubFriendRepository } from "../implems/StubFriendRepository";

describe('retrieve friends handler test', () => {

   test('should retrieve friends', async () => {
        const expectedFriends = [{
            Id: "1",
            Name: "toto"
        },
        {
            Id: "2",
            Name: "tata"
        }]
        const repository = new StubFriendRepository(expectedFriends);
        const handler = new RetrieveFriendsHandler(repository, {
            Present(friends) {
                
            },
        });
        const friends = await handler.Handle();
        expect(friends).toBe(expectedFriends)
   })
    
});