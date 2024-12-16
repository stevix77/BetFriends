import { Friendship } from "../../../src/domain/friendships/Friendship";
import { IFriendshipRepository } from "../../../src/domain/friendships/IFriendshipRepository";

export class StubFriendshipRepository implements IFriendshipRepository {
    
    Friendships: Friendship[] = []

    SaveAsync(friendship: Friendship): Promise<void> {
        this.Friendships.push(friendship);
        return Promise.resolve();
    }
}