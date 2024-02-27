import { FriendsController } from "../../../../adapters/controllers/FriendsController";
import type { IAddFriendOutputPort } from "../../../../../domain/features/add-friend/AddFriendHandler";
import type { MemberDto } from "../../../../../domain/members/IMemberRepository";

export class AddFriendPresenter implements IAddFriendOutputPort {
    private controller: FriendsController|undefined;
    Present(memberId: string): void {
        const member = (this.controller!.vm.Members as MemberDto[]).find(x => x .Id == memberId)
        if(member) {
            member.IsFriend = true;
            this.controller?.vm.Friends.push({
                Id: member.Id,
                Name: member.Name
            });
        }
    }

    Subscribe(controller: FriendsController) {
        this.controller = controller;
    }
}

export interface FriendAdded {
    MemberId: string;
}