import { IMemberRepository } from "../../domain/members/IMemberRepository" 
import { Member } from "../../domain/members/Member";
import { MemberId } from "../../domain/members/MemberId";

export class InMemoryMemberRepository implements IMemberRepository {
    constructor(private members: Member[] = []){

    }
    Save(member: Member): Promise<void> {
        if(!this.members.some(x => x.GetSnapshot().MemberId == member.GetSnapshot().MemberId)) {
            this.members.push(member);
        }
        return Promise.resolve();
    }
    GetByIdAsync(memberId: MemberId): Promise<Member | undefined> {
        const member = this.members.find(x => x.GetSnapshot().MemberId == memberId.Value);
        return Promise.resolve(member)
    }

    GetMembers(): Member[] {
        return this.members
    }

}