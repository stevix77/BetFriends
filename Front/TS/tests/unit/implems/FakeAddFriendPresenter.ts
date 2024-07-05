import { IAddFriendOutputPort } from '../../../src/domain/features/add-friend/AddFriendHandler';
export class FakeAddFriendPresenter implements IAddFriendOutputPort {
    MemberId: string;
    PresentMemberAdded(memberId: string): void {
        this.MemberId = memberId;
    }
}