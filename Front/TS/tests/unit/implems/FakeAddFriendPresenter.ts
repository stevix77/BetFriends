import { IAddFriendOutputPort } from '../../../src/domain/features/AddFriendHandler';
export class FakeAddFriendPresenter implements IAddFriendOutputPort {
    MemberId: string;
    PresentMemberAdded(memberId: string): void {
        this.MemberId = memberId;
    }
}