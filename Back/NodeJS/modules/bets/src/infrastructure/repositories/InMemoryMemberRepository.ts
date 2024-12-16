import { IMemberRepository } from "../../domain/members/IMemberRepository" 
import { Member } from "../../domain/members/Member";
import { MemberId } from "../../domain/members/MemberId";

export class InMemoryMemberRepository implements IMemberRepository {
    constructor(private members: Member[] = []){

    }
    Save(member: Member): PromiseLike<void> {
        if(!this.members.some(x => x.MemberId == member.MemberId)) {
            this.members.push(member);
        }
        return Promise.resolve();
    }
    GetByIdAsync(memberId: MemberId): PromiseLike<Member | undefined> {
        const member = this.members.find(x => x.MemberId.Value == memberId.Value);
        return Promise.resolve(member)
    }

    GetMembers(): Member[] {
        return this.members
    }

}