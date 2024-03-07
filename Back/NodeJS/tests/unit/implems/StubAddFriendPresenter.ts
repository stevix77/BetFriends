import { IAddFriendOutputPort } from "../../../src/application/features/add-friend/AddFriendHandler";

export class StubAddFriendPresenter implements IAddFriendOutputPort {
    MemberDoesNotExist(MemberId: string): void {
        this.FriendAdded = false;
    }
    Present(): void {
        this.FriendAdded = true;
    }
    FriendAdded?: boolean;
}