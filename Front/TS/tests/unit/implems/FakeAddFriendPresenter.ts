import { IAddFriendOutputPort } from '../../../src/domain/features/add-friend/AddFriendHandler';
export class FakeAddFriendPresenter implements IAddFriendOutputPort {
    MemberId: string;
    Present(memberId: string): void {
        this.MemberId = memberId;
    }
}