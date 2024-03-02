import { IAddFriendOutputPort } from "../../../src/application/features/add-friend/AddFriendHandler";

export class StubAddFriendPresenter implements IAddFriendOutputPort {
    Present(): void {
        this.FriendAdded = true;
    }
    FriendAdded: boolean;
}