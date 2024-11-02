import { IMemberRepository, MemberDto } from "../../../domain/members/IMemberRepository";
import {v4 as uuidv4} from 'uuid';

export class InMemoryMemberRepository implements IMemberRepository {
    members: MemberDto[] = [];
    constructor(){
        const memberCount = Math.floor(Math.random() * 50)
        for(let i = 0; i<memberCount; i++) {
            const id: string = uuidv4()
            this.members.push({
                Id: id, 
                Name: id.substring(0, 8), 
                IsFriend: Math.floor(Math.random() * 2) % 2 == 0
            })
        }
    }
    RetrieveByKeywordAsync(keyword: string): Promise<MemberDto[]> {
        return Promise.resolve<MemberDto[]>(this.members.sort((a, b) => (a.IsFriend ? 0 : 1) - (b.IsFriend ? 0 : 1)))
    }

}