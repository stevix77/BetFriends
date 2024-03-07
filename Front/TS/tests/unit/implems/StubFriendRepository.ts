import { FriendDto } from "../../../src/domain/features/retrieveFriends/RetrieveFriendsHandler";
import { IFriendRepository } from "../../../src/domain/friends/IFriendRepository";

export class StubFriendRepository implements IFriendRepository {
    Members: string[] = [];
    constructor(private friends: FriendDto[] = []){

    }
    GetFriendsAsync(): Promise<FriendDto[]> {
        return Promise.resolve(this.friends)
    }
    SaveAsync(memberId: string): Promise<void> {
        this.Members.push(memberId);
        return Promise.resolve();
    }

}