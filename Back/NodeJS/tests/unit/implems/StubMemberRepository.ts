import { IMemberRepository } from "../../../src/domain/members/IMemberRepository";
import { Member } from "../../../src/domain/members/Member";
import { MemberId } from "../../../src/domain/members/MemberId";

export class StubMemberRepository implements IMemberRepository {
    constructor(private member: Member){}
    GetByIdAsync(memberId: MemberId): PromiseLike<Member|undefined> {
        if(this.member.MemberId.Value == memberId.Value) {
            return Promise.resolve(this.member);
        }
        return Promise.resolve(undefined);
    }
}