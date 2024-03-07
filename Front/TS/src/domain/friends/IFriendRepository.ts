import { FriendDto } from "../features/retrieveFriends/RetrieveFriendsHandler";

export interface IFriendRepository {
    GetFriendsAsync(): Promise<FriendDto[]>;
    SaveAsync(memberId: string): Promise<void>;

}