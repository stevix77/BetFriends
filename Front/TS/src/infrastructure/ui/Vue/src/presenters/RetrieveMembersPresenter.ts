import type { FriendsController } from "../../../../../infrastructure/adapters/controllers/FriendsController";
import type { IRetrieveMembersOutputPort } from "../../../../../domain/features/retrieveMembers/RetrieveMembersHandler";
import type { MemberDto } from "../../../../../domain/members/IMemberRepository";

export class RetrieveMembersPresenter implements IRetrieveMembersOutputPort {
    NotEnoughCharacter(): void {
        this.controller!.vm.ShowFriends = true;
    }
    Present(members: MemberDto[]): void {
        this.controller!.vm.Members = members;
        this.controller!.vm.ShowFriends = false;
    }

    Subscribe(controller: FriendsController) {
        this.controller = controller;
    }

    private controller: FriendsController|undefined;

}