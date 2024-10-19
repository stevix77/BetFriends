import { FriendDto } from "../features/RetrieveFriendsHandler";

export interface IFriendRepository {
    GetFriendsAsync(): Promise<FriendDto[]>;
    SaveAsync(memberId: string): Promise<void>;

}