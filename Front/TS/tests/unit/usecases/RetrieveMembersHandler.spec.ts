import { describe, expect, test } from 'vitest';
import { FakeRetrieveMembersPresenter } from '../implems/FakeRetrieveMembersPresenter';
import { RetrieveMembersHandler } from '../../../src/domain/features/retrieveMembers/RetrieveMembersHandler';
import { StubMemberReposiory } from '../implems/StubMemberReposiory';
import { MemberDto } from '../../../src/domain/members/IMemberRepository';
describe('retrieve members handler', () => {

    test('should not retrieve members when keyword length is less than 3 characters', async () => {
        const memberRepository = new StubMemberReposiory(undefined);
        const presenter = new FakeRetrieveMembersPresenter();
        const handler = new RetrieveMembersHandler(memberRepository, presenter)
        await handler.Handle("");
        expect(presenter.Message).toBe("NotEnoughCharacter")
        expect(presenter.Members).toBeUndefined()
    })

    test('should retrieve members when keyword length is equals to 3 characters', async () => {
        const members: MemberDto[] = [{
            Id: "1",
            Name: "1",
            IsFriend: false
        },
        {
            Id: "2",
            Name: "2",
            IsFriend: true
        }]
        const memberRepository = new StubMemberReposiory(members);
        const presenter = new FakeRetrieveMembersPresenter();
        const handler = new RetrieveMembersHandler(memberRepository, presenter)
        await handler.Handle("aaa");
        expect(presenter.Message).toBeUndefined()
        expect(presenter.Members).toBe(members)
    })

    test('should retrieve members when keyword length is more than 3 characters', async () => {
        const members: MemberDto[] = [{
            Id: "1",
            Name: "1",
            IsFriend: false
        },
        {
            Id: "2",
            Name: "2",
            IsFriend: true
        }]
        const memberRepository = new StubMemberReposiory(members);
        const presenter = new FakeRetrieveMembersPresenter();
        const handler = new RetrieveMembersHandler(memberRepository, presenter)
        await handler.Handle("test");
        expect(presenter.Message).toBeUndefined()
        expect(presenter.Members).toBe(members)
    })

})