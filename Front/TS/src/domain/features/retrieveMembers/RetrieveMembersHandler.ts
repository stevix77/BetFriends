import { type IMemberRepository, type MemberDto } from '../../members/IMemberRepository';
export class RetrieveMembersHandler {
    constructor(private memberRepository: IMemberRepository,
                private retrieveMembersOutputPort: IRetrieveMembersOutputPort){}

    private readonly MIN_CHAR_LENGTH: number = 3;

    async Handle(keyword: string): Promise<void> {
        if(keyword.length < this.MIN_CHAR_LENGTH) { 
            this.retrieveMembersOutputPort.NotEnoughCharacter();
            return;
        }
        const members = await this.memberRepository.RetrieveByKeywordAsync(keyword);
        this.retrieveMembersOutputPort.PresentMembers(members);
    }
}

export interface IRetrieveMembersOutputPort {
    NotEnoughCharacter(): void;
    PresentMembers(members: MemberDto[]): void;
}