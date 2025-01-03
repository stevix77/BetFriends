import { describe, test, expect } from 'vitest';
import { BetCreatedNotification } from '../../../src/application/features/create-bet/BetCreatedNotification';
import { BetId } from '../../../src/domain/bets/BetId';
import { MemberId } from '../../../src/domain/members/MemberId';
import { DecreaseBalanceMemberHandler } from '../../../src/application/features/create-bet/DecreaseBalanceMemberHandler';
import { InMemoryMemberRepository } from '../../../src/infrastructure/repositories/InMemoryMemberRepository';
import { Member } from '../../../src/domain/members/Member';
import { MemberSnapshot } from '../../../src/domain/members/MemberSnapshot';
describe('Describe decrease balance handler', () => {
    test('Should decrease balance when member is known', async () => {
        const notification = new BetCreatedNotification(new BetId("betId"), new MemberId("member1"), 20);
        const member = Member.FromSnapshot(new MemberSnapshot("member1","member", 100, 2));
        const memberRepository = new InMemoryMemberRepository([member]);
        const handler = new DecreaseBalanceMemberHandler(memberRepository)
        await handler.Handle(notification);
        expect(member.GetSnapshot().Coins).equals(80);
    })

    test('Should not decrease member unknown', async() => {
        const notification = new BetCreatedNotification(new BetId("betId"), new MemberId("member1"), 20);
        const memberRepository = new InMemoryMemberRepository([]);
        const handler = new DecreaseBalanceMemberHandler(memberRepository)
        await expect(() => handler.Handle(notification)).rejects.toThrowError()
    })
})