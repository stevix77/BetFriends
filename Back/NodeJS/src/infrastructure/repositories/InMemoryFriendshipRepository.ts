import { Friendship } from "../../domain/friendships/Friendship";
import { IFriendshipRepository } from "../../domain/friendships/IFriendshipRepository"

export class InMemoryFriendshipRepository implements IFriendshipRepository {
    constructor(private friendships: Friendship[] = []) {}
    SaveAsync(friendship: Friendship): Promise<void> {
        this.friendships.push(friendship);
        return Promise.resolve();
    }

}