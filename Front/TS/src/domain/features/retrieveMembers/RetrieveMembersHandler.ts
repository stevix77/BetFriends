import { IMemberRepository, MemberDto } from '../../members/IMemberRepository';
export class RetrieveMembersHandler {
    constructor(private memberRepository: IMemberRepository){}

    Handle(keyword: string): Promise<MemberDto[]> {
        return this.memberRepository.RetrieveByKeywordAsync(keyword);
    }
}