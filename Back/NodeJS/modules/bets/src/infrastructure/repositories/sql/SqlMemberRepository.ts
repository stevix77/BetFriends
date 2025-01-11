import { DomainEventAccessor } from "../../../../../shared/infrastructure/events/DomainEventAccessor";
import { IMemberRepository } from "../../../domain/members/IMemberRepository";
import { Member } from "../../../domain/members/Member";
import { MemberId } from "../../../domain/members/MemberId";
import { MemberSnapshot } from "../../../domain/members/MemberSnapshot";
import { BetContext } from "../../DataAccess/BetContext";
import { MemberEntity } from "../../DataAccess/entities/MemberEntity";

export class SqlMemberRepository implements IMemberRepository {

    constructor(private readonly betContext: BetContext, 
                        private readonly domainEventAccessor: DomainEventAccessor
            ){}

            
    async Save(member: Member): Promise<void> {
        const entity = MemberEntity.Create(member.GetSnapshot());
        await this.betContext.MemberEntity.save(entity);
        this.domainEventAccessor.AddEvents(member.DomainEvents);
    }
    async GetByIdAsync(memberId: MemberId): Promise<Member | undefined> {
        const entity = await this.betContext.MemberEntity.findOneBy({
            Id: memberId.Value
        })
        if(!entity) {
            return undefined;
        }
        return Member.FromSnapshot(new MemberSnapshot(entity.Id, entity.Username, entity.Wallet, entity.CountFriends))
    }

}