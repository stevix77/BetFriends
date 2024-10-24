import { IMemberRepository } from "../../../src/domain/members/IMemberRepository";
import { Member } from "../../../src/domain/members/Member";
import { MemberId } from "../../../src/domain/members/MemberId";

export class StubMemberRepository implements IMemberRepository {
    constructor(private member: Member|undefined){}
    Save(member: Member): PromiseLike<void> {
        return Promise.resolve();
    }
    GetByIdAsync(memberId: MemberId): PromiseLike<Member|undefined> {
        return Promise.resolve(this.member);
    }
}