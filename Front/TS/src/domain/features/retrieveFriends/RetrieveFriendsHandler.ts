import { IFriendRepository } from '../../friends/IFriendRepository';
export class RetrieveFriendsHandler {
    constructor(private friendsRepository: IFriendRepository) {}

    Handle() : Promise<FriendDto[]> {
        return this.friendsRepository.GetFriendsAsync();
    }
}

export interface FriendDto {
    Id: string;
    Name: string;
}