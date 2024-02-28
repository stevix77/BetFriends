import { IMemberRepository, MemberDto } from "../../../src/domain/members/IMemberRepository";

export class StubMemberReposiory implements IMemberRepository {
    constructor(private members: MemberDto[] = []) {}

    RetrieveByKeywordAsync(keyword: string): Promise<MemberDto[]> {
        return Promise.resolve(this.members)
    }

}