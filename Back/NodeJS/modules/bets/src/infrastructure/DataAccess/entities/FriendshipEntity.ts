import { Column, Entity } from "typeorm";
import { Friendship } from "../../../domain/friendships/Friendship";

@Entity({
    schema: "bet",
    name: "friendships"
})

export class FriendshipEntity {
    static Create(friendship: Friendship): FriendshipEntity {
        const entity = new FriendshipEntity();
        entity.FriendId = friendship.FriendId.Value;
        entity.RequesterId = friendship.RequesterId.Value;
        return entity;
    }
    @Column({
        name: "friend_id"
    })
    FriendId: string;

    @Column({
        name: "requester_id"
    })
    RequesterId: string;

    @Column({
        name: "created_at"
    })
    CreatedAt: Date;
}