import { IRetrieveMembersOutputPort } from '../../../src/domain/features/retrieveMembers/RetrieveMembersHandler';
import { MemberDto } from '../../../src/domain/members/IMemberRepository';
export class FakeRetrieveMembersPresenter implements IRetrieveMembersOutputPort {
    Message: string;
    Members: MemberDto[];
    NotEnoughCharacter(): void {
        this.Message = "NotEnoughCharacter"
    }
    PresentMembers(members: MemberDto[]): void {
        this.Members = members;
    }

}