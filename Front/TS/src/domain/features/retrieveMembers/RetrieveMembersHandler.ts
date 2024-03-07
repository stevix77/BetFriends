import { type IMemberRepository, type MemberDto } from '../../members/IMemberRepository';
export class RetrieveMembersHandler {
    constructor(private memberRepository: IMemberRepository,
                private retrieveMembersOutputPort: IRetrieveMembersOutputPort){}

    async Handle(keyword: string): Promise<void> {
        if(keyword.length < 3) { 
            this.retrieveMembersOutputPort.NotEnoughCharacter();
            return;
        }
        const members = await this.memberRepository.RetrieveByKeywordAsync(keyword);
        this.retrieveMembersOutputPort.Present(members);
    }
}

export interface IRetrieveMembersOutputPort {
    NotEnoughCharacter(): void;
    Present(members: MemberDto[]): void;
}