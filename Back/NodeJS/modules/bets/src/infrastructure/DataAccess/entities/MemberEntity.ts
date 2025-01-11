import { Column, Entity } from "typeorm";
import { Member } from "../../../domain/members/Member";
import { MemberSnapshot } from "../../../domain/members/MemberSnapshot";

@Entity({
    name: "members",
    schema: "bet"
})
export class MemberEntity {
    static Create(member: MemberSnapshot): MemberEntity {
        const entity = new MemberEntity();
        entity.CountFriends = member.CountFriends;
        entity.Id = member.MemberId;
        entity.Username = member.Username;
        entity.Wallet = member.Coins;
        return entity;
    }

    @Column({
        name: "wallet"
    })
    Wallet: number;
    @Column({
        name: "username"
    })
    Username: string;
    @Column({
        name: "member_id"
    })
    Id: string;
    @Column({
        name: "count_friends"
    })
    CountFriends: number;
    @Column({
        name: "created_at"
    })
    CreatedAt: Date;
}