import { IMemberRepository } from "../../domain/members/IMemberRepository" 
import { Member } from "../../domain/members/Member";
import { MemberId } from "../../domain/members/MemberId";

export class InMemoryMemberRepository implements IMemberRepository {
    constructor(private members: Member[] = []){}
    GetByIdAsync(memberId: MemberId): PromiseLike<Member | undefined> {
        const member = this.members.find(x => x.MemberId.Value == memberId.Value);
        return Promise.resolve(member)
    }

}