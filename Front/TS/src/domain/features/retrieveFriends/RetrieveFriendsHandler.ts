import { IFriendRepository } from '../../friends/IFriendRepository';
export class RetrieveFriendsHandler {
    constructor(private friendsRepository: IFriendRepository,
                private outputPort: IRetrieveFriendsOutputPort) {}

    async Handle() : Promise<void> {
        const friends = await this.friendsRepository.GetFriendsAsync();
        this.outputPort.Present(friends);
    }
}

export interface IRetrieveFriendsOutputPort {
    Present(friends: FriendDto[]): void;
}

export interface FriendDto {
    Id: string;
    Name: string;
}