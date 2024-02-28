import { FriendDto, IRetrieveFriendsOutputPort } from '../../../src/domain/features/retrieveFriends/RetrieveFriendsHandler';
export class FakeRetrieveFriendsPresenter implements IRetrieveFriendsOutputPort {
    public Friends: FriendDto[];

    Present(friends: FriendDto[]): void {
        this.Friends = friends;
    }

}