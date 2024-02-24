export interface IMemberRepository {
    RetrieveByKeywordAsync(keyword: string): Promise<MemberDto[]>;
}

export interface MemberDto {
    Id: string;
    Name: string;
    IsFriend: boolean;
}