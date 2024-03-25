import type { FriendsController } from "../../../../../infrastructure/adapters/controllers/FriendsController";
import type { IRetrieveMembersOutputPort } from "../../../../../domain/features/retrieveMembers/RetrieveMembersHandler";
import type { MemberDto } from "../../../../../domain/members/IMemberRepository";
import { Subject } from 'rxjs';

export class RetrieveMembersPresenter implements IRetrieveMembersOutputPort {
    NotEnoughCharacter(): void {
    }
    Present(members: MemberDto[]): void {
        this.subjects.forEach(x => x.next(members))
    }

    Subscribe(subject: Subject<MemberDto[]>) {
        this.subjects.push(subject)
    }

    private subjects: Subject<MemberDto[]>[] = [];

}